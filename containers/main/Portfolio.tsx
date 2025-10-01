import PortfolioCarousel from '@/components/PortfolioCarousel';
import Section from '@/wrappers/Section';
import Link from 'next/link';

const Portfolio = () => {
  return (
    <Section className="bg-(--identity)">
      <Section.Content>
        <h3 className="text-6xl text-[#fafafa] font-bold">시공 사례</h3>
        <div className="flex justify-between">
          <p className="text-[20px] text-[#717171]">
            “투명한 과정, 전문적인 시공으로 당신의 공간을 완성합니다.”
          </p>
          <Link href="/portfolio">더 보기</Link>
        </div>
      </Section.Content>
      <PortfolioCarousel />
    </Section>
  );
};

export default Portfolio;
