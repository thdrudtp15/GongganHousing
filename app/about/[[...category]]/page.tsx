import PageBanner from '@/containers/PageBanner';

import bannerImg from '@/public/images/banner_about.webp';
import Location from '../_pages/Location';
import Overview from '../_pages/Overview';
import { notFound } from 'next/navigation';

const Page = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  if (category?.[0] === undefined) {
    notFound();
  }

  return (
    <div>
      <PageBanner image={bannerImg}>
        회사소개
      </PageBanner>
      <PageBanner.Category
        select={`/${category?.[0]}`}
        root="/about"
        category={[
          {
            title: '회사소개',
            path: '/overview',
          },
          {
            title: '오시는 길',
            path: '/location',
          },
        ]}
      />
      {category?.[0] === 'overview' && (
        <Overview />
      )}
      {category?.[0] === 'location' && (
        <Location />
      )}
    </div>
  );
};

export default Page;
