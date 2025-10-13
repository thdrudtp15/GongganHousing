import React from 'react';

import Pagination from '@/components/Pagination';
import PortfolioGrid from '@/components/PortfolioGrid';
import PortfolioSearch from '@/components/PortfolioSearch';
import PageSection from '@/wrappers/PageSection';
import PageBanner from '@/containers/PageBanner';
import { getPortfolioList } from '@/lib/queries/portfolio';
import dummy from '@/public/images/banner_portfolio.webp';
import type { Portfolio } from '@/types/portfolio';

const pageSize = 6;

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
  const { data, count } = await getPortfolioList({
    page: +page || 1,
    pageSize: pageSize,
    category: category || '',
    search,
  });

  return (
    <>
    <PageBanner image={dummy} title="시공 사례" >
      <PageBanner.Description description="다양한 시공 현장을 만나보세요" />
      <PageBanner.Breadcrumb breadcrumb={[{ title: '시공 사례' }]} /></PageBanner>
    <PageSection>
        <PageSection.Header>시공 사례</PageSection.Header>
        <p className="text-sm mb-2 text-gray-500">총 {count}개의 게시글이 있습니다.</p>
        <PortfolioSearch search={search} category={category} />
        <PortfolioGrid portfolioData={data as Portfolio[]} />
        <Pagination pageSize={pageSize} totalCount={count as number} nowPage={page} />
      </PageSection>
  
    </>
  );
};
export default Page;
