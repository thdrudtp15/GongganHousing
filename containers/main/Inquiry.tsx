import Section from '@/wrappers/MainSection';
import Map from '@/components/Map';
import Link from 'next/link';

const Inquiry = () => {
  return (
    <Section>
      <Section.Content>
        <h2 className="text-5xl font-bold" id="사업영역">
          상담 및 문의
        </h2>
        <p className="text-lg text-gray-500 mb-8">CONTACT US</p>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="font-bold text-2xl text-gray-900 mb-1">주소</h3>
              <p className="text-gray-600 leading-relaxed">충남 계룡시 엄사면 번영로 10, 303호</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-2xl text-gray-900 mb-1">전화번호</h3>
              <p className="text-gray-600">
                <a href="tel:042-840-8522" className="hover:underline">
                  042-840-8522~3
                </a>
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-2xl text-gray-900 mb-1">이메일</h3>
              <p className="text-gray-600">
                <a href="mailto:gonggan@naver.com" className="hover:underline">
                  gonggan@naver.com
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-2xl text-gray-900 mb-1">영업시간</h3>
              <p className="text-gray-600">09:00~18:00</p>
            </div>
          </div>
          <aside className="w-full h-100 shadow-lg" aria-label="위치 지도">
            <Map />
          </aside>
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 mt-4 w-fit"
          >
            문의하기
          </Link>
        </div>
      </Section.Content>
    </Section>
  );
};

export default Inquiry;
{
  /* <Section.Content className="flex justify-between items-center gap-[60px]">
          <Achivements />
          
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
        </Section.Content> */
}
