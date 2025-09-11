import Map from '@/components/Map';
import PageBanner from '@/containers/PageBanner';

import bannerImg from '@/public/images/banner_portfolio.webp';
import ContentWrap from '@/wrappers/ContentWrap';

const Page = () => {
  return (
    <div>
      <PageBanner image={bannerImg}>오시는 길</PageBanner>
      <ContentWrap className="bg-[#f5f6f5]">
        <ContentWrap.Content>
          <Map />
        </ContentWrap.Content>
      </ContentWrap>
    </div>
  );
};
export default Page;
