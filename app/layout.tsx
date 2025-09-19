import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/containers/Header';
import Footer from '@/containers/Footer';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '공간하우징',
  description: '공간하우징 웹 사이트입니다.',
  keywords: ['건축공사', '실내건축공사', '금속 창호 공사', '옥외 광고 사업'],
  robots: 'index, follow',
  openGraph: {
    title: '공간하우징',
    description: '공간하우징 웹 사이트입니다.',
    locale: 'ko_KR',
    type: 'website',
    url: '',
    siteName: '공간하우징',
    images: [
      {
        url: 'https://res.cloudinary.com/dtodrrwy8/image/upload/v1756717530/favicon_kvnach.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

// 메인 폰트 Pretendard

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
