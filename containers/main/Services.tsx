import Section from '@/wrappers/Section';
import NewServiceItem from '@/components/NewServiceItem';

import dummy1 from '@/public/images/hero_1.jpg';
import dummy2 from '@/public/images/hero_2.jpg';
import dummy3 from '@/public/images/hero_3.jpg';

const Services = () => {
  return (
    <Section
      className="py-[7rem] px-[2rem]"
      id="사업영역"
    >
      <Section.Content>
        <h3 className="text-6xl text-[#0b1b30] font-bold  ">
          사업 영역
        </h3>
        <p className="text-lg text-gray-600 mb-20">
          OUR SERVICES
        </p>

        <div className="flex flex-col gap-20">
          <NewServiceItem
            title="실내 건축"
            desc={
              <p>
                공간의 기능과 아름다움을 고려
                사람의 라이프스타일과 경험을 반영
                최적화된 실내 공간 설계
              </p>
            }
            start="left"
            image={dummy1}
          />
          <NewServiceItem
            title="옥외 광고물"
            desc={
              <p>
                브랜드 가치를 돋보이게 하고 도시
                속에서 강렬한 첫인상 세련되고
                감각적인 옥외광고 솔루션
              </p>
            }
            start="right"
            image={dummy2}
          />
          <NewServiceItem
            title="금속 창호"
            desc={
              <p>
                견고함과 스타일을 동시에 빛과
                공간을 조화롭게 담은 맞춤형 금속
                창호 솔루션
              </p>
            }
            start="left"
            image={dummy3}
          />
        </div>
      </Section.Content>
    </Section>
  );
};

export default Services;
