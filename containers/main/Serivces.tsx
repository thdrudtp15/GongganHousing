import Image, { StaticImageData } from 'next/image';
import dummy_logoB from '@/public/svgs/logo_b.svg';
import ContentWrap from '@/wrappers/ContentWrap';

const ServiceItems = ({
  title,
  icon,
}: {
  title: string;
  icon?: StaticImageData;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <Image
        src={dummy_logoB}
        alt="service icon"
        width={133.33}
        height={133.33}
      />
      <h3 className="text-[30px] font-medium">{title}</h3>
    </div>
  );
};

const Services = () => {
  return (
    <section className="py-[100px] bg-[#FAFAFA]">
      <ContentWrap className="flex flex-col gap-[40px] justify-center">
        <h2 className="text-[50px] font-bold mx-auto">사업 영역</h2>
        <ul className="w-full flex justify-between items-center">
          <li>
            <ServiceItems title="실내건축" />
          </li>
          <li>
            <ServiceItems title="금속창호" />
          </li>
          <li>
            <ServiceItems title="옥외광고물" />
          </li>
          <li>
            <ServiceItems title="기타" />
          </li>
        </ul>
      </ContentWrap>
    </section>
  );
};

export default Services;
