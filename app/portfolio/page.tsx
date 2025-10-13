import React from 'react';

import Pagination from '@/components/Pagination';
import PortfolioGrid from '@/components/PortfolioGrid';
import PortfolioSearch from '@/components/PortfolioSearch';
import { getPortfolioList } from '@/lib/queries/portfolio';

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
    <div>
      <div className="pt-30 pb-20 bg-gray-50">
        <div className="max-w-270 w-full shadow-2xl h-fit m-auto bg-white p-8">
          <h1 className="text-3xl font-bold mb-4">시공 사례</h1>
          <p className="text-sm mb-2 text-gray-500">총 {count}개의 게시글이 있습니다.</p>
          <PortfolioSearch search={search} category={category} />
          <PortfolioGrid portfolioData={data as Portfolio[]} />
          <Pagination pageSize={pageSize} totalCount={count as number} nowPage={page} />
        </div>
      </div>
    </div>
  );
};
export default Page;
