'use server';

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
  const errors = prevState;
  const name = formData.get('name');
  const phone = formData.get('phone');
  const inquiry = formData.get('inquiry');
  const agree = formData.get('agree');

  errors.name = '이름은 필수입니다.';
  errors.phone = '연락처는 필수입니다.';
  errors.agree = '개인정보취급방침동의를 체크해주세요';

  return errors;
};
