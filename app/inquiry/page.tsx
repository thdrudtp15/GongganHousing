import PageBanner from '@/containers/PageBanner';
import bannerImg from '@/public/images/banner_inquiry.png';

const Page = () => {
  return (
    <div>
      <PageBanner image={bannerImg}>상담문의</PageBanner>
    </div>
  );
};

export default Page;
