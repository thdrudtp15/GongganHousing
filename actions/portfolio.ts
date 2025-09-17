'use server';

import { createClient } from '@/lib/supabase/server';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';

export const createPortfolio = async (
  prevState: { content: string; title: string; server: string },
  formdata: FormData,
) => {
  const errors = prevState;
  const supabase = await createClient();

  // const auth = supabase.auth.getUser();
  // if (!(await auth).data.user) {
  //     redirect('/');
  // }

  // zod 적용하기
  const content = formdata.get('content') as string;
  const title = formdata.get('title') as string;

  if (content.trim() === '' || !content) {
    errors.content = '내용은 필수 입력항목입니다.';
  }
  if (title.trim() === '' || !title) {
    errors.title = '제목은 필수 입력항목입니다.';
  }

  if (Object.values(errors).find((error) => error)) {
    return errors;
  }
  const { data, error } = await supabase
    .from('portfolio')
    .insert({ title, content });

  console.log(error, data);

  if (error) {
    errors.server = '서버 에러 발생!';
    return errors;
  }

  return errors;
};
