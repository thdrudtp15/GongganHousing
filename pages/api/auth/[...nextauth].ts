import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import jwt from 'jsonwebtoken';

import type { User } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';
import type { Account } from 'next-auth';
import type { Profile } from 'next-auth';

type SignInParams = {
  user: User | AdapterUser; // NextAuth에서 인증된 유저 객체
  account: Account | null; // OAuth 계정 정보, password 등 인증 방식 정보
  profile?: Profile; // OAuth provider에서 제공하는 profile 정보
  email?: {
    // 이메일 기반 인증 시 정보
    verificationRequest?: boolean;
  };
  credentials?: Record<string, any>; // credentials provider 사용 시 입력값
};

export const authOptions = {
  // 쿠키 설정
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Host-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  // callbacks: useSession / getServerSession 호출 시 리턴할 내용

  callbacks: {
    async signIn({ user }: SignInParams) {
      const allowedEmails = [...process.env.ALLOWED_EMAILS!.trim().split(',')];

      if (user.email && allowedEmails.includes(user.email)) {
        return true; // 로그인 허용
      }
      return false; // 로그인 거부
    },
    async session({ session, user }: { session: any; user: any }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: 'authenticated',
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
    // 필요하면 jwt 콜백도 추가 가능
  },

  // DB 세션/Adapter 설정
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }),

  // OAuth providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/account',
  },
};

export default NextAuth(authOptions);
