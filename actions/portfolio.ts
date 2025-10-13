'use server';

import { removeImages, uploadImage } from '@/lib/cloudinary/cloudinary';
import { createServerSupabaseClient } from '@/lib/supabase/supabaseClient';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import * as z from 'zod';

// submit~으로 함수명 변경하기
export const createPortfolio = async (
  prevState: {
    title: string;
    completed_at: string;
    category: string;
    description: string;
    image: string;
    server: string;
    id: string;
    started_at: string;
  },
  formdata: FormData,
) => {
  const { supabaseAccessToken } = await getServerSession(authOptions);

  const supabase = createServerSupabaseClient(supabaseAccessToken);

  const errors = { ...prevState };

  const id = formdata.get('id') as string;

  // 제목
  const title = formdata.get('title') as string;

  // 설명
  const description = formdata.get('description') as string;

  // 이미지 카운트
  const imageCount = formdata.get('image_count') as string;

  // 이미지 배열
  const imageArray: File[] = [];

  // 삭제할 이미지 카운트
  const deleteImageCount = formdata.get('delete_count') as string;

  // 삭제할 이미지 아이디 배열
  const deleteImageArray: { id: string; image: string }[] = [];

  // 카테고리
  const category = formdata.get('category');

  // 시공 시작 날짜
  const started_at = formdata.get('started_at');

  // 시공 완료 날짜
  const completed_at = formdata.get('completed_at');

  for (let i = 0; i < +imageCount; i++) {
    imageArray.push(formdata.get(`image_${i}`) as File);
  }

  for (let i = 0; i < +deleteImageCount; i++) {
    const data = formdata.get(`delete_${i}`);
    const datas = JSON.parse(data as string);
    deleteImageArray.push(datas);
  }

  console.log(imageArray, '추가할 이미지 배열');
  console.log(deleteImageArray, '삭제할 이미지 배열');

  // zod 적용하기
  const Portfolio = z
    .object({
      title: z.string().nonempty({
        error: '제목을 작성해주세요',
      }),
      started_at: z.string().nonempty({
        error: '시공 시작 날짜를 선택해주세요',
      }),
      completed_at: z.string().nonempty({
        error: '시공 완료 날짜를 선택해주세요',
      }),
      category: z.string().nonempty({
        error: '시공 분야를 선택해주세요',
      }),

      description: z.string().nonempty({
        error: '내용을 작성해주세요',
      }),
    })
    .refine(
      (data) => {
        // started_at이 completed_at보다 이전이거나 같아야 함
        const startDate = new Date(data.started_at);
        const endDate = new Date(data.completed_at);
        return startDate <= endDate;
      },
      {
        message: '시공 시작 날짜는 완료 날짜보다 이전이어야 합니다',
        path: ['completed_at'], // 에러를 표시할 필드
      },
    );

  const result = Portfolio.safeParse({
    title,
    started_at,
    completed_at,
    category,
    description,
    image: imageArray,
  });

  if (!result.success) {
    const fieldsError = z.flattenError(result.error).fieldErrors;
    errors.title = fieldsError.title?.[0] || '';
    errors.started_at = fieldsError.started_at?.[0] || '';
    errors.completed_at = fieldsError.completed_at?.[0] || '';
    errors.category = fieldsError.category?.[0] || '';
    errors.description = fieldsError.description?.[0] || '';
    // errors.image = fieldsError.image?.[0] || '';
    return errors;
  }

  let serverResult;

  if (!id) {
    serverResult = await supabase
      .from('portfolio')
      .insert({
        title,
        started_at,
        completed_at,
        category,
        description,
      })
      .select('id')
      .single();
  } else {
    serverResult = await supabase
      .from('portfolio')
      .update({
        title,
        started_at,
        completed_at,
        category,
        description,
      })
      .eq('id', +id)
      .select('id')
      .single();
  }

  const { data, error } = serverResult;

  if (error) {
    errors.server = error.message;
    return errors;
  }

  try {
    if (imageArray.length > 0) {
      const imageUrls = await Promise.all(
        imageArray.map(async (image) => await uploadImage(image)),
      );

      const { error } = await supabase.from('portfolio_images').insert(
        imageUrls.map((url) => ({
          parent_id: data.id,
          image: url,
        })),
      );

      if (error) {
        throw new Error(error.message);
      }
    }

    if (deleteImageArray.length > 0 && id) {
      const { error } = await supabase
        .from('portfolio_images')
        .delete()
        .in(
          'id',
          deleteImageArray.map((image: any) => image.id),
        );

      const result = await removeImages({ urls: deleteImageArray.map((image) => image.image) });

      if (error) {
        throw new Error(error.message);
      }
    }
  } catch (error: any) {
    console.log(error);
    errors.server = error?.message || error.toString();
  }

  revalidateTag('portfolio');
  revalidateTag('portfolio-list');
  errors.id = data.id;

  return errors;
};
