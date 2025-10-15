import Section from '@/components/ui/MainSection';
import ServiceItem from '@/components/main/ServiceItem';

import windowImage from "@/public/images/service_window.png"
import interiorImage from "@/public/images/service_interior.webp"
import advertising from "@/public/images/service_advertising.webp"

const Services = () => {
  return (
    <Section>
      <Section.Content>
        <h2 className="text-5xl font-bold" id="사업영역">
          사업 영역
        </h2>
        <p className="text-lg text-gray-500 mb-8">OUR SERVICES</p>
        <div className='flex flex-col gap-10'>
          <ServiceItem
            title="실내 건축"
            desc="공간의 기능과 아름다움을 고려 사람의 라이프스타일과 경험을 반영 최적화된 실내 공간 설계"
            href="/portfolio?category=실내건축"
            image={interiorImage}
            start="left"
          />
          <ServiceItem
            title="옥외 광고물"
            desc="브랜드 가치를 돋보이게 하고 도시 속에서 강렬한 첫인상 세련되고 감각적인 옥외광고 솔루션"
            href="/portfolio?category=옥외광고물"
            image={advertising}
            start="right"
          />
           <ServiceItem
            title="금속 창호"
            desc="견고함과 스타일을 동시에 빛과 공간을 조화롭게 담은 맞춤형 금속 창호 솔루션"
            href="/portfolio?category=금속창호"
            image={windowImage}
            start="left"
          />
        </div>
      </Section.Content>
    </Section>
  );
};

export default Services;
