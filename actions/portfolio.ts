'use server';

import { createServerSupabaseClient } from '@/lib/supabase/supabaseClient';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import * as z from 'zod';

export const createPortfolio = async (
  prevState: { content: string; title: string; server: string; id: string },
  formdata: FormData,
) => {
  const { supabaseAccessToken } = await getServerSession(authOptions);
  const supabase = createServerSupabaseClient(supabaseAccessToken);

  const errors = { ...prevState };

  const content = formdata.get('content') as string;
  const title = formdata.get('title') as string;

  // zod 적용하기
  const Portfolio = z.object({
    title: z.string().nonempty({ error: '제목을 작성해주세요' }),
    content: z.string().nonempty({ error: '내용을 작성해주세요' }),
  });

  const result = Portfolio.safeParse({ title, content });

  if (!result.success) {
    const fieldsError = z.flattenError(result.error).fieldErrors;
    errors.title = fieldsError.title?.[0] || '';
    errors.content = fieldsError.content?.[0] || '';
    return errors;
  }

  const { data, error } = await supabase
    .from('portfolio')
    .insert({ title, content })
    .select('id')
    .single();

  if (error) {
    errors.server = '서버 에러 발생!!!!@';
    return errors;
  }

  errors.id = data.id;

  return errors;
};
