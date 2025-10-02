'use server';

import * as z from 'zod';

import { getHtml, getMailContent, transporter } from '@/lib/mail/mail';
import { supabase } from '@/lib/supabase/supabaseClient';

export type sendInpuiryPrevStateType = {
  name: string;
  phone: string;
  inquiry: string;
  agree: string;
  server: string;
};

export const sendInpuiry = async (prevState: sendInpuiryPrevStateType, formData: FormData) => {
  const errors = { ...prevState }; // 새로운 오브젝트를 만들어주어야 한다.

  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const inquiry = formData.get('inquiry') as string;
  const agree = formData.get('agree') === 'on';

  const Inquiry = z.object({
    name: z
      .string()
      .nonempty({ error: '이름은 필수입니다.' })
      .regex(/^[가-힣a-zA-Z]{2,30}$/, {
        message: '이름은 2~30자의 한글 또는 영어만 가능합니다.',
      }),
    phone: z.string().nonempty({ error: '연락처는 필수입니다.' }),
    // .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, {
    //   message: '올바른 전화번호를 입력해주세요.',
    // }),
    inquiry: z.string().nonempty({ error: '문의 사항을 작성해주세요' }),
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

  const { data, error } = await supabase
    .from('inquiries')
    .insert({ name, phone, inquiry })
    .select('id')
    .single();

  if (data) {
    try {
      const html = getHtml(name);
      const mailContent = getMailContent(html);
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
