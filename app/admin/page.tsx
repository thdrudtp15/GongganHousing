import PageBanner from '@/containers/PageBanner';

import dummy from '@/public/images/banner_inquiry.webp';
import Section from '@/wrappers/Section';

const Page = async () => {
  // 페이지 권한 제어?는 미들웨어에서 작성

  return (
    <div>
      <PageBanner image={dummy}>
        시공 사례 작성
      </PageBanner>
      <Section>
        <Section.Content>
          <input type="text" placeholder="제목" />
          <textarea placeholder="설명" />
        </Section.Content>
      </Section>
    </div>
  );
};

export default Page;
