import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

import ScrollDown from '@/components/ScrollDown';

import heroImg from '@/public/images/hero.webp';

const Overlay = () => {
  return (
    <div className="absolute w-full h-full top-0 flex justify-center items-center flex-col bg-[rgba(0,0,0,0.6)]">
      <h1 className="text-6xl font-bold text-[#ffffff] text-[80px] mb-[20px]">
        공간에 가치를 더하다
      </h1>
      <p className="text-[20px] font-medium text-[#ffffff] mb-[40px]">
        전문성과 투명성을 바탕으로 고객만을 생각합니다.
      </p>
      <Link
        href="/"
        className="group
                   overflow-hidden relative border       
                   px-[30px] py-[20px] text-[#ffffff]
                   hover:text-[transparent]
                   transition duration-400
                   after:content-['']  after:absolute
                   after:w-full  after:h-full after:cursor-pointer
                   after:bg-(--identity) after:z-[2]
                   after:top-0  after:left-[0%]
                   after:transition after:duration-600
                   after:translate-x-[-100%]  hover:after:translate-x-[0%]
                   "
      >
        <p className="relative flex items-center gap-[12px] z-[3]  text-[#ffffff]">
          View Look Book
          <FaArrowRightLong fontSize={'16px'} />
        </p>
      </Link>
      <ScrollDown />
    </div>
  );
};

const Hero = () => {
  return (
    <section className={`w-full h-screen relative overflow-hidden`}>
      <Image
        src={heroImg.src}
        alt="hero"
        fill
        className="object-cover animate-(--scale-up)"
        priority
      />
      <Overlay />
      <div></div>
    </section>
  );
};

export default Hero;
