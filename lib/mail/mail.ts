import nodemailer from 'nodemailer';

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

export const getHtml = (title: string) => {
  return `
      <div>
          <h1>문의사항이 도착했습니다.</h1>
          <h2>${title}</h2>
          <p>문의사항을 확인해주세요.</p>
      </div>
  `;
};
