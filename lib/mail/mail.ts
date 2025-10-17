import nodemailer from 'nodemailer';
import DOMPurify from 'isomorphic-dompurify';

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
       <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
        <h1 style="color: #1a1a1a; font-size: 24px; margin: 0 0 10px 0; font-weight: 600;">
          새로운 문의사항이 도착했습니다
        </h1>
        
        <p style="color: #666; margin: 0 0 30px 0; font-size: 14px;">
          아래 내용을 확인하시고 빠른 시일 내에 답변 부탁드립니다.
        </p>
        
        <div style="border-top: 2px solid #e5e5e5; padding-top: 20px;">
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; font-size: 14px; display: block; margin-bottom: 5px;">이름</strong>
            <p style="margin: 0; color: #1a1a1a; font-size: 16px;">${escapedName}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; font-size: 14px; display: block; margin-bottom: 5px;">연락처</strong>
            <p style="margin: 0; color: #1a1a1a; font-size: 16px;">${escapedPhone}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; font-size: 14px; display: block; margin-bottom: 5px;">문의 분야</strong>
            <p style="margin: 0; color: #1a1a1a; font-size: 16px;">${escapedCategory}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #333; font-size: 14px; display: block; margin-bottom: 5px;">문의 내용</strong>
            <p style="margin: 0; color: #1a1a1a; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${escapedInquiry}</p>
          </div>
          
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
            이 메일은 자동으로 발송되었습니다.
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `);
};
