import PageBanner from '@/containers/PageBanner';

import bannerImg from '@/public/images/banner_portfolio.webp';

const Page = () => {
  return (
    <div>
      <PageBanner image={bannerImg}>시공사례</PageBanner>
    </div>
  );
};
export default Page;
