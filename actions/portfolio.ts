'use server';

import { removeImages, uploadImage } from '@/lib/cloudinary/cloudinary';
import { createServerSupabaseClient } from '@/lib/supabase/supabaseClient';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import * as z from 'zod';

const Portfolio = z
  .object({
    title: z.string().min(1, '제목을 작성해주세요'),
    started_at: z.string().min(1, '시공 시작 날짜를 선택해주세요'),
    completed_at: z.string().min(1, '시공 완료 날짜를 선택해주세요'),
    category: z.string().min(1, '시공 분야를 선택해주세요'),
    description: z.string().min(1, '내용을 작성해주세요'),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.started_at);
      const endDate = new Date(data.completed_at);
      return !isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && startDate <= endDate;
    },
    {
      message: '시공 시작 날짜는 완료 날짜보다 이전이어야 합니다',
      path: ['completed_at'],
    },
  );

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
  const errors = { ...prevState };
  const { supabaseAccessToken } = await getServerSession(authOptions);

  if (!supabaseAccessToken) {
    errors.server = '인증이 필요합니다';
    return errors;
  }

  const supabase = createServerSupabaseClient(supabaseAccessToken);

  const id = formdata.get('id') as string;

  // FormData 추출
  const title = formdata.get('title') as string;
  const description = formdata.get('description') as string;
  const category = formdata.get('category');
  const started_at = formdata.get('started_at');
  const completed_at = formdata.get('completed_at');

  // 이미지 개수 추출
  const imageCount = (formdata.get('image_count') as string) || 0;
  const deleteImageCount = (formdata.get('delete_count') as string) || 0;

  const imageArray: File[] = [];
  const deleteImageArray: { id: string; image: string }[] = [];

  for (let i = 0; i < +imageCount; i++) {
    imageArray.push(formdata.get(`image_${i}`) as File);
  }

  for (let i = 0; i < +deleteImageCount; i++) {
    const data = formdata.get(`delete_${i}`);
    const datas = JSON.parse(data as string);
    deleteImageArray.push(datas);
  }

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
    return errors;
  }

  let serverDataResult;
  let serverImageResult;

  try {
    let imageUrls: string[] = [];
    // 이미지 업로드
    if (imageArray.length > 10) {
      errors.image = '이미지는 최대 10개까지 업로드할 수 있습니다';
      return errors;
    }
    // 이미지의 개수가 10개 이상일 때.
    else if (imageArray.length > 0) {
      imageUrls = await Promise.all(imageArray.map(async (image) => await uploadImage(image)));
    }

    const PortfolioData = {
      title,
      cover: imageUrls?.[0] || '',
      started_at,
      completed_at,
      category,
      description,
    };

    // 게시글 생성
    if (!id) {
      serverDataResult = await supabase
        .from('portfolio')
        .insert(PortfolioData)
        .select('id')
        .single();
    }
    // 게시글 수정정
    else {
      serverDataResult = await supabase
        .from('portfolio')
        .update(PortfolioData)
        .eq('id', +id)
        .select('id')
        .single();
    }

    const { data, error: serverDataResultError } = serverDataResult;

    // 서버 데이터 생성 실패 시 에러 발생
    if (serverDataResultError) {
      throw new Error(serverDataResultError.message);
    }

    // 이미지 업로드 시 에러 발생
    if (imageUrls?.length > 0) {
      serverImageResult = await supabase.from('portfolio_images').insert(
        imageUrls?.map((url) => ({
          parent_id: data?.id,
          image: url,
        })),
      );
    }

    const { error: serverImageResultError } = serverImageResult || {};

    if (serverImageResultError) {
      throw new Error(serverImageResultError.message);
    }

    if (deleteImageArray.length > 0 && id) {
      const { error } = await supabase
        .from('portfolio_images')
        .delete()
        .in(
          'id',
          deleteImageArray.map((image: any) => image.id),
        );

      if (error) {
        throw new Error(error.message);
      }
      // Cloudinary에서 삭제
      try {
        await removeImages({
          urls: deleteImageArray.map((img) => img.image),
        });
      } catch (cloudinaryError) {
        console.error('Cloudinary 삭제 실패:', cloudinaryError);
      }
    }
  } catch (error: any) {
    if (serverDataResult?.data?.id) {
      await supabase.from('portfolio').delete().eq('id', serverDataResult?.data?.id);
    }
    console.log(error);
    errors.server = error?.message || error.toString();
  }

  revalidateTag('portfolio');
  revalidateTag('portfolio-list');
  errors.id = serverDataResult?.data?.id.toString();

  return errors;
};
