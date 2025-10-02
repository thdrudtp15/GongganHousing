import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getPortfolioData_ } from '@/lib/queries/portfolio';

import PageBanner from '@/containers/PageBanner';
import Section from '@/wrappers/Section';

import dummy from '@/public/images/banner_inquiry.webp';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const { data } = await getPortfolioData_(id);

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
  const { data } = await getPortfolioData_(id);

  return (
    <div>
      <PageBanner image={dummy}>시공사례</PageBanner>
      <Section>
        <Section.Content>ㅎㅇ</Section.Content>
      </Section>
    </div>
  );
};

export default Detail;
