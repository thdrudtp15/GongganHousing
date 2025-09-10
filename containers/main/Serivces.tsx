import ServiceItem from '@/components/ServiceItem';
import ContentWrap from '@/wrappers/ContentWrap';

import dummy_serviceImg_1 from '@/public/images/service_1.png';
import dummy_serviceImg_2 from '@/public/images/service_2.png';
import dummy_serviceImg_3 from '@/public/images/service_3.png';

const Services = () => {
  return (
    <section className="py-[100px] bg-[#FAFAFA]">
      <ContentWrap className="flex gap-[40px] justify-center">
        <div className="w-full">
          <h2 className="font-bold text-[60px] mb-[24px]">사업 영역</h2>
          <p className="font-medium text-[20px] max-w-[400px] text-[#717171] break-keep">
            인테리어에서 창호, 그리고 광고물까지 설계, 시공, 관리가 하나로
            이어지는 토탈 솔루션으로 고객의 공간과 브랜드 가치를 완성합니다.
          </p>
        </div>
        <div className="w-full flex flex-col">
          <ul>
            <ServiceItem image={dummy_serviceImg_3}>실내건축</ServiceItem>
            <ServiceItem image={dummy_serviceImg_2}>금속창호</ServiceItem>
            <ServiceItem image={dummy_serviceImg_1}>옥외광고물</ServiceItem>
          </ul>
        </div>
      </ContentWrap>
    </section>
  );
};

export default Services;
