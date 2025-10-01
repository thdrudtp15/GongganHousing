import Section from '@/wrappers/Section';
import Achivements from '@/components/Achivements';
import Link from 'next/link';

const Inquiry = () => {
  return (
    <>
      <Section id="상담문의">
        <Section.Content className="flex justify-between items-center gap-[60px]">
          <Achivements />
          {/* <InquiryForm /> */}
          <div className="flex-1">
            <h2 className="text-[80px] text-(--identity) font-bold">상담문의</h2>
            <p className="text-5 text-[20px] text-[#717171] mb-10">
              “편하게 문의 주시면, 최적의 솔루션을 찾아드립니다.”
            </p>
            <Link
              href="/inquiry"
              className="bg-(--identity) border rounded-md px-10 py-4 text-[#ffffff]"
              type="button"
            >
              문의하기
            </Link>
          </div>
        </Section.Content>
      </Section>
    </>
  );
};

export default Inquiry;
