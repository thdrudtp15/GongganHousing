import * as z from 'zod';

// 시공 사례 검증증
export const PortfolioSchema = z
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

// 문의 사항 검증증
export const InquirySchema = z.object({
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

// 환경 변수 검증
export const EnviromentSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1, { message: 'SUPABASE_URL은 필수입니다.' }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, { message: 'SUPABASE_ANON_KEY은 필수입니다.' }),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, { message: 'CLOUDINARY_CLOUD_NAME은 필수입니다.' }),
  CLOUDINARY_API_KEY: z.string().min(1, { message: 'CLOUDINARY_API_KEY은 필수입니다.' }),
  CLOUDINARY_API_SECRET: z.string().min(1, { message: 'CLOUDINARY_API_SECRET은 필수입니다.' }),
});
