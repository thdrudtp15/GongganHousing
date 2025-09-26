import Section from '@/wrappers/Section';
import Achivements from '@/components/Achivements';
import InquiryForm from '@/components/InquiryForm';

const Inquiry = () => {
  return (
    <>
      <Section id="상담문의">
        <Section.Content className="flex justify-between items-center gap-[60px]">
          <Achivements />
          <InquiryForm />
        </Section.Content>
      </Section>
    </>
  );
};

export default Inquiry;
