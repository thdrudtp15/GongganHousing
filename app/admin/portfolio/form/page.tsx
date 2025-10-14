import PageBanner from '@/components/ui/PageBanner';
import PortfolioForm from '@/components/portfolio/PortfolioForm';

import dummy from '@/public/images/banner_inquiry.webp';
import PageSection from '@/components/ui/PageSection';
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
       <>
        <PageBanner image={dummy} title="시공 사례 작성" >
          <PageBanner.Breadcrumb breadcrumb={[{ title: '시공 사례 작성' }]} />
        </PageBanner>
          <PageSection>
            <PageSection.Header>시공 사례 작성</PageSection.Header>
            <PortfolioForm data={portfolioData as Portfolio} imageData={portfolio_images || []} />
          </PageSection>
       </>
  );
};

export default Page;
