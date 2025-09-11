import Pagination from '@/components/Pagination';
import PageBanner from '@/containers/PageBanner';

import bannerImg from '@/public/images/banner_portfolio.webp';
import ContentWrap from '@/wrappers/ContentWrap';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  return (
    <div>
      <PageBanner image={bannerImg}>시공사례</PageBanner>
      <ContentWrap>
        <ContentWrap.Content className="bg-[#f5f6f5]">
          <Pagination totalPages={20} nowPage={page} />
        </ContentWrap.Content>
      </ContentWrap>
    </div>
  );
};
export default Page;
