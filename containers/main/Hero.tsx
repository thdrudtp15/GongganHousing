import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';

import ScrollDown from '@/components/ScrollDown';

import heroImg from '@/public/images/hero.webp';

const Overlay = () => {
  return (
    <div className="absolute w-full h-full top-0 flex justify-center items-center flex-col gap-[40px] bg-[rgba(0,0,0,0.6)]">
      <h1 className="text-6xl font-bold text-[#ffffff]">
        공간에 가치를 더하다
      </h1>
      <p className="text-[20px] font-medium text-[#ffffff]">
        전문성과 투명성을 바탕으로 고객만을 생각합니다.
      </p>
      <button className="bg-[#0c1d30] px-[30px] py-[20px] font-normal text-[#ffffff] flex gap-[12px] items-center">
        View Look Book
        <FaArrowRightLong fontSize={'16px'} />
      </button>
      <ScrollDown />
    </div>
  );
};

const Hero = () => {
  return (
    <section
      className={`w-full h-screen relative overflow-hidden`}
    >
      <Image
        src={heroImg.src}
        alt="hero"
        fill
        className="object-cover animate-(--scale-up)"
      />
      <Overlay />
      <div></div>
    </section>
  );
};

export default Hero;
