import ContentWrap from '@/wrappers/ContentWrap';
import { ReactNode } from 'react';

const ServiceListItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className="py-[32px] font-medium text-[40px] leading-[150%] border-b-[1px] border-[#8e8e8e]">
      {children}
    </li>
  );
};

const Services = () => {
  return (
    <section className="py-[100px] bg-[#FAFAFA]">
      <ContentWrap className="flex gap-[40px] justify-center">
        <div>
          <h2 className="font-bold text-[60px] leading-[150%] mb-[24px]">
            사업 영역
          </h2>
          <p className="font-medium text-[20px] leading-[150%] text-[#717171] break-keep">
            인테리어에서 창호, 그리고 광고물까지 설계, 시공, 관리가 하나로
            이어지는 토탈 솔루션으로 고객의 공간과 브랜드 가치를 완성합니다.
          </p>
        </div>
        <div className="w-full flex flex-col">
          <ul>
            <ServiceListItem>실내건축</ServiceListItem>
            <ServiceListItem>금속창호</ServiceListItem>
            <ServiceListItem>옥외광고물</ServiceListItem>
          </ul>
        </div>
      </ContentWrap>
    </section>
  );
};

export default Services;
