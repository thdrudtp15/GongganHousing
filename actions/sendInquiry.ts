'use server';

import * as z from 'zod';

export type sendInpuiryPrevStateType = {
  name: string;
  phone: string;
  inquiry: string;
  agree: string;
};

export const sendInpuiry = async (
  prevState: sendInpuiryPrevStateType,
  formData: FormData,
) => {
  const errors = { ...prevState }; // 새로운 오브젝트를 만들어주어야 한다.
  const name = formData.get('name');
  const phone = formData.get('phone');
  const inquiry = formData.get('inquiry');
  const agree = formData.get('agree') === 'on';

  const Inquiry = z.object({
    name: z.string().nonempty({ error: '이름은 필수입니다.' }),
    phone: z.string().nonempty({ error: '연락처는 필수입니다.' }),
    inquiry: z.string().nonempty({ error: '문의 사항을 작성해주세요' }),
    agree: z.boolean().refine((value) => value === true, {
      error: '개인정보취급방침 동의를 체크해주세요',
    }),
  });

  const result = Inquiry.safeParse({ name, phone, inquiry, agree });

  if (result.success) {
    return errors;
  } else {
    const fieldsError = z.flattenError(result.error).fieldErrors;
    return {
      name: fieldsError.name?.[0] || '',
      phone: fieldsError.phone?.[0] || '',
      inquiry: fieldsError.inquiry?.[0] || '',
      agree: fieldsError.agree?.[0] || '',
    };
  }
};

// parse 간단한 검증, 실패시 바로 멈추는 로직에서 쓰는 게 좋다.
// safeParse 대부분의 상황에서 사용
