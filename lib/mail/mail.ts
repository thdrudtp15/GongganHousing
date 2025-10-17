import nodemailer from 'nodemailer';
import DOMPurify from 'dompurify';

import escapeHTML from '@/lib/utils/escapeHTML';

export const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_NAVER_EMAIL,
    pass: process.env.NAVER_PW,
  },
});

export const getMailContent = (
  html: string,
  attachments?: { filename: string; content: Buffer }[],
) => {
  return {
    from: process.env.NEXT_PUBLIC_NAVER_EMAIL,
    to: process.env.NEXT_PUBLIC_NAVER_EMAIL,
    subject: '공간하우징 문의사항',
    html,
    attachments: attachments,
  };
};

export const getHtml = (name: string, phone: string, inquiry: string, category: string) => {
  const escapedName = escapeHTML(name);
  const escapedPhone = escapeHTML(phone);
  const escapedInquiry = escapeHTML(inquiry);
  const escapedCategory = escapeHTML(category);

  return DOMPurify.sanitize(`
      <div>
          <h1>새로운 문의사항이 도착했습니다.</h1>
          <p>아래 내용을 확인하시고 빠른 시일 내에 답변 부탁드립니다.</p>
          <h2>이름: ${escapedName}</h2>
          <p>연락처: ${escapedPhone}</p>
          <p>문의 분야: ${escapedCategory}</p>
          <p>문의 내용: ${escapedInquiry}</p>
          <p>문의사항을 확인해주세요.</p>
      </div>
  `);
};
