import PortfolioCarousel from "@/components/embla/PortfolioCarousel";
import Section from '@/wrappers/MainSection';
import Link from 'next/link';
import Button from "@/compositions/Button";
const Portfolio = () => {
  return (
    <Section>
      <Section.Content className="overflow-hidden">
        <h2 className="text-5xl font-bold" id="사업영역">
          시공 사례
        </h2>
        <div className="flex justify-between mb-8">
          <p className="text-lg text-gray-500">PORTFOLIO</p>
          <Link href="/portfolio">
            <Button type="button" className="text-sm">
              더 보기
            </Button>
          </Link>
        </div>
        <PortfolioCarousel />
      </Section.Content>
    </Section>
  );
};

export default Portfolio;
