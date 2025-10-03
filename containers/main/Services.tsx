import Section from '@/wrappers/Section';
import Link from 'next/link';
import Image from 'next/image';

const ServiceItem = ({ title, desc, href }: { title: string; desc: string; href: string }) => {
  return (
    <article className="border border-gray-200 p-4">
      <div className="relative"></div>
      <h3 className="font-bold text-2xl mb-1">{title}</h3>
      <p className="text-gray-500 mb-6">{desc}</p>
      <Link href={href}>View More</Link>
    </article>
  );
};

const Services = () => {
  return (
    <Section>
      <Section.Content>
        <h2 className="text-5xl font-bold" id="사업영역">
          사업 영역
        </h2>
        <p className="text-lg text-gray-500 mb-8">OUR SERVICES</p>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-between w-full gap-4">
          <ServiceItem
            title="실내 건축"
            desc="공간의 기능과 아름다움을 고려 사람의 라이프스타일과 경험을 반영 최적화된 실내 공간 설계"
            href="/portfolio?cateogry=실내건축"
          />
          <ServiceItem
            title="옥외 광고물"
            desc="브랜드 가치를 돋보이게 하고 도시 속에서 강렬한 첫인상 세련되고 감각적인 옥외광고 솔루션"
            href="/portfolio?cateogry=옥외광고물"
          />
          <ServiceItem
            title="금속 창호"
            desc="견고함과 스타일을 동시에 빛과 공간을 조화롭게 담은 맞춤형 금속 창호 솔루션"
            href="/portfolio?cateogry=금속창호"
          />
        </div>
      </Section.Content>
    </Section>
  );
};

export default Services;
