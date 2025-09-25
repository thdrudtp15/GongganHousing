'use client';

import Image from 'next/image';
import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

import type {
  Dispatch,
  SetStateAction,
} from 'react';

import dummyImage1 from '@/public/images/hero_1.jpg';
import dummyImage2 from '@/public/images/hero_2.jpg';
import dummyImage3 from '@/public/images/hero_3.jpg';

const images = [
  dummyImage1,
  dummyImage2,
  dummyImage3,
];

const Overlay = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="absolute w-full h-full bg-gradient-to-b from-black/20 via-black/40 to-black/60 z-[2] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
          <span className="block">
            공간을 재정의하는
          </span>
          <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent ">
            건축의 혁신
          </span>
        </h1>

        <div className="w-24 h-1 bg-white/80 mx-auto rounded-full"></div>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
          우리는 건축의 한계를 넘어 새로운
          가능성을 창조합니다.
          <br />각 프로젝트는 고객의 꿈을 현실로
          만드는 혁신적인 여정입니다.
        </p>
        <div className="pt-4">
          <Link
            href="/portfolio"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            프로젝트 보기
          </Link>
        </div>
        <div>
          <button
            className="font-[#ffffff]"
            onClick={() =>
              setStage((prev: number) => prev + 1)
            }
          >
            ㅎㅇ
          </button>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const [stage, setStage] = useState(0);

  return (
    <section className="w-full h-screen overflow-hidden relative">
      <Overlay setStage={setStage} />
      <div className="w-full">
        <div className="w-screen h-screen relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={images[stage]}
                alt="이미지"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;
