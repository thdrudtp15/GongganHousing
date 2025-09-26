import PageBanner from '@/containers/PageBanner';

import bannerImg from '@/public/images/banner_about.webp';
import Section from '@/wrappers/Section';

const Page = () => {
  return (
    <div>
      <PageBanner image={bannerImg}>
        회사소개
      </PageBanner>
      <Section className="bg-[#f5f6f5]">
        <Section.Content>
          회사소개
        </Section.Content>
      </Section>
    </div>
  );
};

export default Page;
