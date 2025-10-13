'use server';

import * as z from 'zod';

import { getHtml, getMailContent, transporter } from '@/lib/mail/mail';
import { verifyTurnstileToken } from './turnstile';
import { supabase } from '@/lib/supabase/supabaseClient';
import { headers } from 'next/headers';

export type sendInpuiryPrevStateType = {
  name: string;
  phone: string;
  inquiry: string;
  agree: string;
  server: string;
  file: string;
};

export const sendInpuiry = async (prevState: sendInpuiryPrevStateType, formData: FormData) => {
  const errors = { ...prevState };

  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const inquiry = formData.get('inquiry') as string;
  const agree = formData.get('agree') === 'on';
  const token = formData.get('turnstile_token') as string;
  const files = formData.getAll('files') as File[];

  console.log(files);

  const verify = await verifyTurnstileToken(token);

  if (!verify) {
    return { ...errors, server: '보안 검증 실패' };
  }

  const Inquiry = z.object({
    name: z.string().min(1, { error: '이름은 필수입니다.' }),
    phone: z.string().min(1, { error: '연락처는 필수입니다.' }),
    // .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, {
    //   message: '올바른 전화번호를 입력해주세요.',
    // }),
    inquiry: z.string().min(1, { error: '문의 사항을 작성해주세요' }),
    agree: z.boolean().refine((value) => value === true, {
      error: '개인정보취급방침 동의를 체크해주세요',
    }),
  });

  const result = Inquiry.safeParse({ name, phone, inquiry, agree });

  if (!result.success) {
    const fieldsError = z.flattenError(result.error).fieldErrors;
    errors.name = fieldsError.name?.[0] || '';
    errors.phone = fieldsError.phone?.[0] || '';
    errors.inquiry = fieldsError.inquiry?.[0] || '';
    errors.agree = fieldsError.agree?.[0] || '';
    return errors;
  }

  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

  // 10분 내 같은 IP 3회 이상 제출 차단
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  const { data: recentSubmissions } = await supabase
    .from('inquiries')
    .select('id')
    .eq('ip_address', ip)
    .gte('created_at', tenMinutesAgo);

  if (recentSubmissions && recentSubmissions.length >= 3) {
    return {
      ...errors,
      server: '너무 많은 요청입니다. 10분 후 다시 시도해주세요.',
    };
  }

  const { data, error } = await supabase
    .from('inquiries')
    .insert({ name, phone, inquiry, ip_address: ip })
    .select('id')
    .single();

  // 용량 제한
  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );

  if (data) {
    try {
      const html = getHtml(name);
      const mailContent = getMailContent(html, attachments);
      await transporter.sendMail(mailContent);
      await supabase.from('inquiries').update({ status: 'success' }).eq('id', data.id);
    } catch (error) {
      await supabase.from('inquiries').update({ status: 'failed' }).eq('id', data.id);
      errors.server = '서버 에러가 발생하였습니다.';
      console.log(error);
      return errors;
    }
  } else {
    errors.server = error.message;
  }

  return errors;
};

// parse 간단한 검증, 실패시 바로 멈추는 로직에서 쓰는 게 좋다.
// safeParse 대부분의 상황에서 사용
