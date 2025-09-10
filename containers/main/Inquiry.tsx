import ContentWrap from '@/wrappers/ContentWrap';

import Achivements from '@/components/Achivements';
import InquiryForm from '@/components/InquiryForm';

const Inquiry = () => {
  return (
    <section className="py-[100px] bg-[#F5F6F5]">
      <ContentWrap className="flex justify-between items-center gap-[60px]">
        <Achivements />
        <InquiryForm />
      </ContentWrap>
    </section>
  );
};

export default Inquiry;
