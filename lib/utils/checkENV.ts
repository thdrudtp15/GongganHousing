const checkEnvironmentVariables = (vars: Record<string, string | undefined>, category: string) => {
  const missingVars = Object.entries(vars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    return { category, missingVars };
  }
  return null;
};

export const validateEnvironmentVariables = () => {
  const checks = [
    checkEnvironmentVariables(
      {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        ALLOWED_EMAILS: process.env.ALLOWED_EMAILS,
      },
      'NextAuth',
    ),
    checkEnvironmentVariables(
      {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      'Supabase',
    ),
    checkEnvironmentVariables(
      {
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
      },
      'Cloudinary',
    ),
    checkEnvironmentVariables(
      {
        NEXT_PUBLIC_NAVER_ID: process.env.NEXT_PUBLIC_NAVER_ID,
        NEXT_PUBLIC_NAVER_EMAIL: process.env.NEXT_PUBLIC_NAVER_EMAIL,
        NAVER_PW: process.env.NAVER_PW,
      },
      'Email (Naver)',
    ),
    checkEnvironmentVariables(
      {
        NEXT_PUBLIC_KAKAO_MAPS_API_KEY: process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY,
      },
      'Kakao Map',
    ),
    checkEnvironmentVariables(
      {
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
      },
      'Turnstile',
    ),
  ];

  const errors = checks.filter((check) => check !== null);

  if (errors.length > 0) {
    const errorMessage = errors
      .map((error) => `\n[${error!.category}]\n  - ${error!.missingVars.join('\n  - ')}`)
      .join('\n');

    throw new Error(`환경 변수 검증 실패: ${errorMessage}`);
  }
};
