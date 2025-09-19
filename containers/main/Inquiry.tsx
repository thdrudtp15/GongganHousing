import ContentWrap from '@/wrappers/ContentWrap';
import Achivements from '@/components/Achivements';
import InquiryForm from '@/components/InquiryForm';

const Inquiry = () => {
  return (
    <>
      <div
        className="cf-turnstile"
        data-sitekey={process.env.TURNSTILE_SITE_KEY}
      />
      <ContentWrap className="bg-[#f5f6f5]">
        <ContentWrap.Content className="flex justify-between items-center gap-[60px]">
          <Achivements />
          <InquiryForm />
        </ContentWrap.Content>
      </ContentWrap>
    </>
  );
};

export default Inquiry;
