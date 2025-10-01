import React from 'react';

import Pagination from '@/components/Pagination';
import PageBanner from '@/containers/PageBanner';
import PortfolioGrid from '@/components/PortfolioItem';
import PortfolioSearch from '@/components/PortfolioSearch';
import Section from '@/wrappers/Section';

import { getPortfolioList } from '@/lib/queries/portfolio';
import bannerImg from '@/public/images/banner_portfolio.webp';

import type { Portfolio } from '@/types/portfolio';

const pageSize = 4;

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
      <PageBanner image={bannerImg}>시공사례</PageBanner>
      <Section className="bg-[#f5f6f5]">
        <Section.Content>
          <PortfolioSearch search={search} category={category} />
          <PortfolioGrid portfolioData={data as Portfolio[]} />
          <Pagination pageSize={pageSize} totalCount={count as number} nowPage={page} />
        </Section.Content>
      </Section>
    </div>
  );
};
export default Page;
