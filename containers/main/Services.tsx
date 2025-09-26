import Section from '@/wrappers/Section';
import NewServiceItem from '@/components/editor/NewServiceItem';

import dummy1 from '@/public/images/banner_about.webp';
import dummy2 from '@/public/images/banner_inquiry.webp';
import dummy3 from '@/public/images/banner_portfolio.webp';

const Services = () => {
  return (
    <Section className="py-[7rem] px-[2rem]">
      <Section.Content className="max-w-300">
        <div className="flex flex-col gap-20">
          <NewServiceItem
            title="실내건축"
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
