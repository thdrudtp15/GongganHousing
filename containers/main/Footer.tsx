import Image from 'next/image';

import ContentWrap from '@/wrappers/ContentWrap';

import logoB from '@/public/svgs/logo_b.svg';

const Footer = () => {
  return (
    <footer className="py-[100px] bg-[#FAFAFA]">
      <ContentWrap className="flex justify-between">
        <div className="w-[80px] h-[50px] relative">
          <Image src={logoB} fill alt="logo" />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-normal">대표이사: 송진철</p>
          <p className="font-normal">전화번호: 042-840-8522~3</p>
          <p className="font-normal">이메일: gonggan25@naver.com</p>
          <p className="font-normal">
            주소: 충남 계룡시 엄사면 번영로 10, 303호
          </p>
        </div>
      </ContentWrap>
    </footer>
  );
};

export default Footer;
