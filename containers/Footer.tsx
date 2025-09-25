import Image from 'next/image';

import ContentWrap from '@/wrappers/ContentWrap';

import logoImg from '@/public/svgs/logo_c.svg';

const Footer = async () => {
  return (
    <footer className="p-[4rem] bg-(--color-background) text-[#ffffff]">
      <ContentWrap>
        <div className="mb-[2rem]">
          <Image
            className="mb-[2rem]"
            src={logoImg}
            width={70}
            alt="logo"
          />
          <strong className="text-[1rem] ">
            주소
          </strong>
          <address className="text-[0.875rem] mb-[1rem] text-[#616161]">
            충남 계룡시 엄사면 번영로 10, 303호
          </address>
          <strong className="text-[1rem]">
            연락처
          </strong>
          <address className="text-[0.875rem] text-[#616161]">
            042-840-8522~3
          </address>
        </div>
        <div className="border-t border-(--color-border-section) pt-[2rem] flex justify-between">
          <p className="text-[0.725rem]">
            @ 2025 공간하우징
          </p>
        </div>
      </ContentWrap>
    </footer>
  );
};

export default Footer;
