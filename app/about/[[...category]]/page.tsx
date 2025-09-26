import PageBanner from '@/containers/PageBanner';

import bannerImg from '@/public/images/banner_about.webp';
import { notFound } from 'next/navigation';
import Location from '../_pages/Location';

const Page = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return (
    <div>
      <PageBanner image={bannerImg}>
        회사소개
      </PageBanner>
      {category?.[0] === 'location' && (
        <Location />
      )}
    </div>
  );
};

export default Page;
