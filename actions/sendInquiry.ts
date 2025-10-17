'use server';

import { getHtml, getMailContent, transporter } from '@/lib/mail/mail';
import { verifyTurnstileToken } from './turnstile';
import { supabase } from '@/lib/supabase/supabaseClient';
import { headers } from 'next/headers';
import { InquirySchema } from '@/zod/zod';
import * as z from 'zod';

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
  const category = formData.get('category') as string;
  const files = formData.getAll('files') as File[];

  const verify = await verifyTurnstileToken(token);

  if (!verify) {
    return { ...state, server: '보안 검증 실패' };
  }

  const result = InquirySchema.safeParse({ name, phone, inquiry, agree });

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
      const html = getHtml(name, phone, inquiry, category);
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
