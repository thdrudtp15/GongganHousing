import Image from 'next/image';

import ContentWrap from '@/wrappers/ContentWrap';

import dummy_image1 from '@/public/images/project_1.jpg';
import dummy_image2 from '@/public/images/project_2.jpg';
import dummy_image3 from '@/public/images/project_3.jpg';
import dummy_image4 from '@/public/images/project_4.jpg';

/** 보류 (디자인) */

const Services = () => {
  return (
    <section className="py-[7rem] px-[2rem]">
      <ContentWrap>
        <h2 className="text-center text-[3rem] mb-[2rem]">
          사업영역 소개
        </h2>
        <p className="text-center mb-[3rem]">
          사업 영역 소개 섹션입니다.사업 영역 소개
          섹션입니다.사업 영역 소개 섹션입니다.
        </p>
        <div className="flex gap-[1rem]">
          <div className="w-full border border-(--color-border-card)">
            <div className="relative aspect-[16/9]">
              <Image
                src={dummy_image1}
                alt="사업영역"
                fill
              />
            </div>
            <div className="p-[2rem]">
              <h3 className="text-[2rem] mb-[1.5rem]">
                실내건축
              </h3>
              <p>
                실내건축 설명입니다. 실내건축
                설명입니다. 실내건축 설명입니다.
                실내건축 설명입니다. 실내건축
                설명입니다. 실내건축 설명입니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[1rem]">
            <div className="flex gap-[1rem] h-full">
              <div className="border border-(--color-border-card) p-[1rem]">
                <h3 className="font-bold ">
                  옥외 광고물
                </h3>
                <p>
                  옥외 광고물 설명입니다. 옥외
                  광고물 설명입니다. 옥외 광고물
                  설명입니다. 옥외 광고물
                  설명입니다.
                </p>
              </div>
              <div className="border border-(--color-border-card) p-[1rem]">
                <h3>옥외 광고물</h3>
                <p>
                  옥외 광고물 설명입니다. 옥외
                  광고물 설명입니다. 옥외 광고물
                  설명입니다. 옥외 광고물
                  설명입니다.
                </p>
              </div>
            </div>
            <div className="flex h-full">
              <div className="w-[50%] relative">
                <Image
                  src={dummy_image2}
                  alt="사업영역"
                  fill
                />
              </div>
              dfdf
            </div>
          </div>
        </div>
      </ContentWrap>
    </section>
  );
};

export default Services;
