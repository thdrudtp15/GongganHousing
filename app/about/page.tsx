import PageBanner from '@/containers/PageBanner';

import bannerImg from '@/public/images/banner_about.webp';
import ContentWrap from '@/wrappers/ContentWrap';

const Page = () => {
  return (
    <div>
      <PageBanner image={bannerImg}>회사소개</PageBanner>
      <ContentWrap className="bg-[#f5f6f5]">
        <ContentWrap.Content>회사소개</ContentWrap.Content>
      </ContentWrap>
    </div>
  );
};

export default Page;
