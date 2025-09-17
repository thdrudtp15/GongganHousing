import Image from 'next/image';

import logoB from '@/public/svgs/logo_b.svg';
import Auth from '@/components/Auth';

const Footer = () => {
  return (
    <footer className="py-[100px] bg-[#FAFAFA] flex flex-col items-center justify-center gap-[40px]">
      <Image src={logoB} width={120} height={75} alt="logo" priority />
      <div className="flex flex-col gap-[8px]">
        <p className="text-[#747474] text-[14px] text-center">
          대표자: 송진철 연락처: 042-840-8522~3
        </p>
        <p className="text-[#747474] text-[14px] text-center">
          이메일: gonggan25@naver.com 주소: 충남 계룡시 엄사면 번영로 10, 303호
        </p>
        <p className="text-[#747474] text-[14px] text-center">
          취급: 건축공사, 실내건축공사, 금속 창호 공사, 옥외 광고 사업
        </p>
      </div>
      {/* <Auth /> */}
    </footer>
  );
};

export default Footer;
