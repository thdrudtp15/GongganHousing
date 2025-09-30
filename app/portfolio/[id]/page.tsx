import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import {
  getPortfolioData,
  getPorfolioImages,
} from '@/lib/queries/portfolio';

import PageBanner from '@/containers/PageBanner';

import dummy from '@/public/images/banner_inquiry.webp';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const { data } = await getPortfolioData(id);

  if (!data) notFound();

  return {
    title: data.title,
    description: `${data.title} 상세페이지입니다.`,
    robots: {
      index: true,
      follow: true,
    },
  };
};

const Detail = async ({ params }: Props) => {
  const { id } = await params;
  const { data } = await getPortfolioData(id);
  const { data: imageData } =
    await getPorfolioImages(id);

  console.log(data);
  console.log(imageData);

  return (
    <div>
      <PageBanner image={dummy}>
        시공사례
      </PageBanner>
    </div>
  );
};

export default Detail;
