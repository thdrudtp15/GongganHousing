import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
        url: 'https://res.cloudinary.com/dtodrrwy8/image/upload/v1760691565/ChatGPT_Image_2025%EB%85%84_8%EC%9B%94_20%EC%9D%BC_%EC%98%A4%ED%9B%84_03_35_16_l3afu2.png',
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
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
