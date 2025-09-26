import PageBanner from '@/containers/PageBanner';
import bannerImg from '@/public/images/banner_inquiry.webp';
import Section from '@/wrappers/Section';

const Page = () => {
  return (
    <div>
      <PageBanner image={bannerImg}>
        상담문의
      </PageBanner>
      <Section className="bg-[#f5f6f5]">
        <Section.Content>
          상담문의
        </Section.Content>
      </Section>
    </div>
  );
};

export default Page;
