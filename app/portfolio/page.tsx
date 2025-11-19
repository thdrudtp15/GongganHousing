import React from 'react';

import Pagination from '@/components/ui/Pagination';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import PortfolioSearch from '@/components/portfolio/PortfolioSearch';
import PageSection from '@/components/ui/PageSection';
import PageBanner from '@/components/ui/PageBanner';
import { getPortfolioList } from '@/lib/queries/portfolio';
import dummy from '@/public/images/banner_portfolio.webp';
import type { Portfolio } from '@/types/portfolio';
import { Suspense } from 'react';
import { PortfolioSkeleton } from '@/components/portfolio/PortfolioGrid';
import { cache } from 'react';
const pageSize = 6;

const getPortfolioListByCache = cache(
  async (page: string, pageSize: number, category: string, search: string) => {
    return await getPortfolioList({ page: +page || 1, pageSize, category: category || '', search });
  },
);

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    search: string;
    category: string;
  }>;
}) => {
  const { page, search, category } = await searchParams;
  const { count } = await getPortfolioListByCache(page, pageSize, category, search);

  return (
    <>
      <PageBanner image={dummy} title="시공 사례">
        <PageBanner.Description description="다양한 시공 현장을 만나보세요" />
        <PageBanner.Breadcrumb breadcrumb={[{ title: '시공 사례' }]} />
      </PageBanner>
      <PageSection>
        <PageSection.Header>시공 사례</PageSection.Header>
        <PortfolioSearch search={search} category={category} count={count as number} />
        <Suspense key={`${page}-${search}-${category}`} fallback={<PortfolioSkeleton />}>
          <PortfolioContent searchParams={{ page, search, category }} />
        </Suspense>
      </PageSection>
    </>
  );
};
export default Page;

// 별도 컴포넌트로 분리
async function PortfolioContent({
  searchParams,
}: {
  searchParams: { page: string; search: string; category: string };
}) {
  const { page, search, category } = searchParams;
  const { data, count } = await getPortfolioListByCache(page, pageSize, category, search);

  return (
    <>
      <PortfolioGrid portfolioData={data as Portfolio[]} />
      <Pagination pageSize={6} totalCount={count as number} nowPage={page} />
    </>
  );
}
