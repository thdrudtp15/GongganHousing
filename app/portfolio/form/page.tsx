import PageBanner from '@/containers/PageBanner';
import PortfolioForm from '@/components/PortfolioForm';

import dummy from '@/public/images/banner_inquiry.webp';
import Section from '@/wrappers/Section';
import { getPortfolioData_ } from '@/lib/queries/portfolio';
import { redirect } from 'next/navigation';
import type { Portfolio } from '@/types/portfolio';

type Props = {
  searchParams: Promise<{ id: string }>;
};

const Page = async ({ searchParams }: Props) => {
  // 페이지 권한 제어?는 미들웨어에서 작성

  const { id } = await searchParams;
  let result;

  if (id) {
    result = await getPortfolioData_(id);
  }

  const { data, error } = result || {};

  if (id && (!data || error)) {
    redirect('/portfolio/form');
  }

  const { portfolio_images, ...portfolioData } = data || {};

  return (
    <div>
      <PageBanner image={dummy}>시공 사례 작성</PageBanner>
      <Section>
        <Section.Content>
          <PortfolioForm data={portfolioData as Portfolio} imageData={portfolio_images || []} />
        </Section.Content>
      </Section>
    </div>
  );
};

export default Page;
