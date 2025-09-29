'use server';

import { uploadImage } from '@/lib/cloudinary/uploadImage';
import { createServerSupabaseClient } from '@/lib/supabase/supabaseClient';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import * as z from 'zod';

export const createPortfolio = async (
  prevState: {
    title: string;
    completed_at: string;
    category: string;
    description: string;
    image: string;
    server: string;
    id: string;
  },
  formdata: FormData,
) => {
  const { supabaseAccessToken } =
    await getServerSession(authOptions);

  const supabase = createServerSupabaseClient(
    supabaseAccessToken,
  );

  const errors = { ...prevState };

  // 제목
  const title = formdata.get('title') as string;

  // 설명
  const description = formdata.get(
    'description',
  ) as string;

  // 이미지 카운트
  const imageCount = formdata.get(
    'imageCount',
  ) as string;

  // 이미지 배열
  const imageArray: File[] = [];

  // 카테고리
  const category = formdata.get('category');

  // 시공 날짜
  const completed_at = formdata.get(
    'completed_at',
  );

  for (let i = 0; i < +imageCount; i++) {
    imageArray.push(
      formdata.get(`image_${i}`) as File,
    );
  }

  // zod 적용하기
  const Portfolio = z.object({
    title: z.string().nonempty({
      error: '제목을 작성해주세요',
    }),
    completed_at: z.string().nonempty({
      error: '시공 날짜를 선택해주세요',
    }),
    category: z.string().nonempty({
      error: '시공 분야를 선택해주세요',
    }),
    description: z.string().nonempty({
      error: '내용을 작성해주세요',
    }),
    image: z
      .array(z.file())
      .min(1, '이미지는 필수입니다.')
      .max(
        10,
        '이미지는 10개까지 등록할 수 있습니다.',
      ),
  });

  const result = Portfolio.safeParse({
    title,
    completed_at,
    category,
    description,
    image: imageArray,
  });

  if (!result.success) {
    const fieldsError = z.flattenError(
      result.error,
    ).fieldErrors;
    errors.title = fieldsError.title?.[0] || '';
    errors.completed_at =
      fieldsError.completed_at?.[0] || '';
    errors.category =
      fieldsError.category?.[0] || '';
    errors.description =
      fieldsError.description?.[0] || '';
    errors.image = fieldsError.image?.[0] || '';
    return errors;
  }

  const { data, error } = await supabase
    .from('portfolio')
    .insert({
      title,
      completed_at,
      category,
      description,
    })
    .select('id')
    .single();

  if (error) {
    errors.server = '서버 에러 발생!!!';
    return errors;
  }

  try {
    const imageUrls = await Promise.all(
      imageArray.map(
        async (image) => await uploadImage(image),
      ),
    );

    const { error } = await supabase
      .from('portfolio_images')
      .insert(
        imageUrls.map((url) => ({
          parent_id: data.id,
          image: url,
        })),
      );

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.log(error);
    errors.server = '서버 에러 발생';
  }

  errors.id = data.id;

  return errors;
};
