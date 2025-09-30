import PageBanner from '@/containers/PageBanner';
import PortfolioForm from '@/components/PortfolioForm';

import dummy from '@/public/images/banner_inquiry.webp';
import Section from '@/wrappers/Section';
import { getPorfolioImages, getPortfolioData } from '@/lib/queries/portfolio';
import { notFound, redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{ id: string }>;
};

const Page = async ({ searchParams }: Props) => {
  // 페이지 권한 제어?는 미들웨어에서 작성

  const { id } = await searchParams;
  let data;
  let imageData;

  if (id) {
    data = await getPortfolioData(id);
    imageData = await getPorfolioImages(id);
  }

  if (id && (!data?.data || !imageData?.data)) {
    redirect('/portfolio/form');
  }

  return (
    <div>
      <PageBanner image={dummy}>시공 사례 작성</PageBanner>
      <Section>
        <Section.Content>
          <PortfolioForm data={data?.data} imageData={imageData?.data || []} />
        </Section.Content>
      </Section>
    </div>
  );
};

export default Page;
