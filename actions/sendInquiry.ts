'use server';

import * as z from 'zod';

import { getHtml, getMailContent, transporter } from '@/lib/mail/mail';
import { verifyTurnstileToken } from './turnstile';
import { supabase } from '@/lib/supabase/supabaseClient';
import { headers } from 'next/headers';

export type sendInquiryPrevStateType = {
  name: string;
  phone: string;
  inquiry: string;
  agree: string;
  server: string;
  file: string;
  success: boolean;
};

// 파일 용량 제한 상수
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILE = 5;
const INITIAL_STATE: sendInquiryPrevStateType = {
  name: '',
  phone: '',
  inquiry: '',
  agree: '',
  server: '',
  file: '',
  success: false,
};

export const sendInquiry = async (prevState: sendInquiryPrevStateType, formData: FormData) => {
  const state = { ...prevState };

  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const inquiry = formData.get('inquiry') as string;
  const agree = formData.get('agree') === 'on';
  const token = formData.get('turnstile_token') as string;
  const files = formData.getAll('files') as File[];

  const verify = await verifyTurnstileToken(token);

  if (!verify) {
    return { ...state, server: '보안 검증 실패' };
  }

  const Inquiry = z.object({
    name: z
      .string()
      .min(1, { message: '이름은 필수입니다.' })
      .max(30, { message: '이름은 30자 이하로 입력해주세요.' }),

    phone: z
      .string()
      .min(1, { message: '연락처는 필수입니다.' })
      .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, {
        message: '올바른 전화번호를 입력해주세요. 예: 010-1234-5678',
      }),
    inquiry: z
      .string()
      .min(1, { message: '문의 내용을 입력해주세요.' })
      .max(1000, { message: '문의 내용은 1000자 이하로 입력해주세요.' }),
    agree: z.boolean().refine((value) => value === true, {
      error: '개인정보취급방침 동의를 체크해주세요',
    }),
  });

  const result = Inquiry.safeParse({ name, phone, inquiry, agree });

  if (!result.success) {
    const fieldsError = z.flattenError(result.error).fieldErrors;
    state.name = fieldsError.name?.[0] || '';
    state.phone = fieldsError.phone?.[0] || '';
    state.inquiry = fieldsError.inquiry?.[0] || '';
    state.agree = fieldsError.agree?.[0] || '';
    return state;
  }

  if (files.length > MAX_FILE) {
    return {
      ...state,
      file: `최대 ${MAX_FILE}개의 파일만 첨부할 수 있습니다.`,
    };
  }

  // 파일 용량 검증
  if (files.length > 0) {
    // 빈 파일 필터링
    const validFiles = files.filter((file) => file.size > 0);

    // 개별 파일 크기 검증
    const oversizedFile = validFiles.find((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFile) {
      return {
        ...state,
        file: `파일 "${oversizedFile.name}"의 크기가 5MB를 초과합니다.`,
      };
    }

    // 전체 파일 크기 검증
    const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      return {
        ...state,
        file: '전체 파일 크기가 10MB를 초과합니다.',
      };
    }
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
      ...state,
      server: '너무 많은 요청입니다. 10분 후 다시 시도해주세요.',
    };
  }

  const { data, error } = await supabase
    .from('inquiries')
    .insert({ name, phone, inquiry, ip_address: ip })
    .select('id')
    .single();

  // 파일 첨부
  const attachments = await Promise.all(
    files
      .filter((file) => file.size > 0) // 빈 파일 제외
      .map(async (file) => ({
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
      return {
        ...INITIAL_STATE,
        success: true,
      };
    } catch (error) {
      console.log(error);
      await supabase.from('inquiries').update({ status: 'failed' }).eq('id', data.id);
      state.server = '서버 에러가 발생하였습니다.';
      return state;
    }
  } else {
    state.server = error.message;
    return state;
  }
};
