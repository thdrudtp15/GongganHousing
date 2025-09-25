import ContentWrap from '@/wrappers/ContentWrap';
import Map from '@/components/Map';

import { MdOutlineMailOutline } from 'react-icons/md';
import { MdOutlinePhone } from 'react-icons/md';
import { MdOutlineLocationOn } from 'react-icons/md';

import type { ReactNode } from 'react';

const Info = ({
  icon,
  title,
  description,
  address,
}: {
  icon: ReactNode;
  title?: string;
  description?: string;
  address?: string;
}) => {
  return (
    <article className="flex flex-col">
      {icon}
      <h2 className="text-2xl font-bold leading-tight">
        {title}
      </h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        {description}
      </p>

      <address className="not-italic text-[1.25rem]">
        {address}
      </address>
    </article>
  );
};

const ContactUs = () => {
  return (
    <section className="py-[7rem] px-[2rem]">
      <ContentWrap>
        <h2 className="text-[4rem] font-bold mb-[2rem]">
          상담 및 문의
        </h2>
        <p className="mb-[2rem] text-[1.5rem] w-[600px]">
          공간하우징은 고객과의 소통을 가장
          중요하게 생각합니다. 작은 문의라도
          성심껏 답변드리며, 언제든지 연락 주시면
          빠르고 정확하게 안내해 드리겠습니다.
        </p>
        <div className="flex gap-[3rem]">
          <div className="flex flex-col gap-[2rem]">
            <Info
              icon={
                <MdOutlineMailOutline
                  fontSize="2rem"
                  color="#007BFF"
                />
              }
              title="이메일"
              description="이메일을 보내주시면 담당자가 확인 후 신속히 연락드립니다."
              address="thdrudtp15@naver.com"
            />
            <Info
              icon={
                <MdOutlinePhone
                  fontSize="2rem"
                  color="#28A745"
                />
              }
              title="전화번호"
              description="직접 통화로 보다 빠른 상담을 받으실 수 있습니다."
              address="042-840-8522~3"
            />
            <Info
              icon={
                <MdOutlineLocationOn
                  fontSize="2rem"
                  color="#DC3545"
                />
              }
              title="주소"
              address="충남 계룡시 엄사면 번영로 10, 303호"
            />
          </div>
          <div className="w-full flex-1 bg-black">
            <Map />
          </div>
        </div>
      </ContentWrap>
    </section>
  );
};

export default ContactUs;
