import { unstable_cache } from 'next/cache';
import React from 'react';

import Pagination from '@/components/Pagination';
import PortfolioItem from '@/components/PortfolioItem';
import PageBanner from '@/containers/PageBanner';
import { supabase } from '@/lib/supabase/supabaseClient';

import bannerImg from '@/public/images/banner_portfolio.webp';
import Section from '@/wrappers/Section';

const pageSize = 4;

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const getPortfolio = unstable_cache(
    async (page: number) => {
      const from = ((+page || 1) - 1) * pageSize;
      const to = from + pageSize - 1;
      const { data, count } = await supabase
        .from('portfolio')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      return { data, count };
    },
    [`portfolio-page:${page}`],
    { revalidate: 86400 },
  );

  const { data, count } = await getPortfolio(
    +page || 1,
  );

  return (
    <div>
      <PageBanner image={bannerImg}>
        시공사례
      </PageBanner>

      <Section className="bg-[#f5f6f5]">
        <Section.Content>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 mb-20">
            {data?.map((portfolio) => (
              <React.Fragment key={portfolio.id}>
                <PortfolioItem data={portfolio} />
              </React.Fragment>
            ))}
          </div>
          <Pagination
            pageSize={pageSize}
            totalCount={count as number}
            nowPage={page}
          />
        </Section.Content>
      </Section>
    </div>
  );
};
export default Page;
