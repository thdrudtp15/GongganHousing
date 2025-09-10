import PageBanner from '@/containers/PageBanner';

import bannerImg from '@/public/images/banner_about.webp';

const Page = () => {
  return (
    <div>
      <PageBanner image={bannerImg}>회사소개</PageBanner>
    </div>
  );
};

export default Page;
