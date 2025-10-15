import PageBanner from '@/components/ui/PageBanner';
import bannerImg from '@/public/images/banner_inquiry.webp';
import PageSection from '@/components/ui/PageSection';
import InquiryForm from '@/components/inquiry/InquiryForm';

const Page = () => {
  return (
    <div>
      <PageBanner image={bannerImg} title="상담 문의">
        <PageBanner.Description description="편하게 문의 주시면, 최적의 솔루션을 찾아드립니다." />
        <PageBanner.Breadcrumb breadcrumb={[{ title: '상담 문의' }]} />
      </PageBanner>
      {/* <Section className="bg-[#f5f6f5]">
        <Section.Content> */}
        <PageSection>
          <PageSection.Header>상담 문의</PageSection.Header>
          <InquiryForm /> 
        </PageSection>
        {/* </Section.Content>
      </Section> */}
    </div>
  );
};

export default Page;
