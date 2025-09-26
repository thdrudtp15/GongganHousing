import Section from '@/wrappers/Section';
import Link from 'next/link';

const Portfolio = () => {
  return (
    <Section className="bg-(--identity)">
      <Section.Content>
        <h2 className="text-4xl font-bold mb-4 text-white">
          다양한 시공 사례를 확인해보세요
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          공간하우징이 진행한 다양한 시공 사례를
          한눈에 확인할 수 있습니다.
        </p>
        <Link
          href="/portfolio"
          className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          시공 사례 보기
        </Link>
      </Section.Content>
    </Section>
  );
};

export default Portfolio;
