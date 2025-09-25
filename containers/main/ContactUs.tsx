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
    <article className="flex items-start gap-6 p-6 bg-white rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300">
      {/* 아이콘 */}
      <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
        <div className="text-blue-600">
          {icon}
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 space-y-3">
        <h2 className="text-xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>

        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>

        <address className="not-italic text-sm text-gray-500 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {address}
        </address>
      </div>
    </article>
  );
};

const ContactUs = () => {
  return (
    <section className="py-[7rem] px-[2rem]">
      <ContentWrap>
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-[2rem]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-[2rem]">
            상담 및 문의
          </h2>

          <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
            <span className="font-medium text-blue-700">
              공간하우징
            </span>
            은 고객과의 소통을 가장 중요하게
            생각합니다.
            <br className="hidden md:block" />
            작은 문의라도 성심껏 답변드리며,
            언제든지 연락 주시면
            <br className="hidden md:block" />
            <span className="font-medium">
              빠르고 정확하게
            </span>{' '}
            안내해 드리겠습니다.
          </p>
        </div>
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
