import PageBanner from '@/containers/PageBanner';

import bannerImg from '@/public/images/banner_about.png';

const Page = () => {
  return (
    <div>
      <PageBanner image={bannerImg}>회사소개</PageBanner>
    </div>
  );
};

export default Page;
