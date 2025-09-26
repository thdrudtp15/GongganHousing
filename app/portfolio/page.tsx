import Pagination from '@/components/Pagination';
import PageBanner from '@/containers/PageBanner';

import bannerImg from '@/public/images/banner_portfolio.webp';
import Section from '@/wrappers/Section';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  return (
    <div>
      <PageBanner image={bannerImg}>
        시공사례
      </PageBanner>
      <Section className="bg-[#f5f6f5]">
        <Section.Content>
          <Pagination
            totalPages={20}
            nowPage={page}
          />
        </Section.Content>
      </Section>
    </div>
  );
};
export default Page;
