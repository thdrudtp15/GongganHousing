'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollDownButton from '@/components/ScrollDown';

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

const delay = 8000;

const Overlay = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<number>>;
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev: number) => {
        if (images.length - 1 > prev)
          return prev + 1;
        else return 0;
      });
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute w-full h-full bg-[rgba(0,0,0,0.7)] z-[2] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-7xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
          <span className="block">
            공간에 가치를 더하다
          </span>
        </h1>

        <div className="w-24 h-1 bg-white/80 mx-auto rounded-full"></div>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
          전문성과 투명성을 바탕으로 고객만을
          생각합니다.
        </p>
        <div className="pt-4">
          <Link
            href="/portfolio"
            className=" backdrop-blur-lg border  text-white px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            프로젝트 보기
          </Link>
        </div>
      </div>
      <div className="absolute bottom-20"></div>
      <ScrollDownButton />
    </div>
  );
};

const Hero = () => {
  const [stage, setStage] = useState(0);

  return (
    <section className="w-full h-screen overflow-hidden relative">
      <Overlay setStage={setStage} />
      <div className="w-screen h-screen relative">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className="absolute inset-0"
            initial={{
              opacity: idx === stage ? 1 : 0,
              scale: 1,
            }}
            animate={{
              opacity: idx === stage ? 1 : 0,
              scale: idx === stage ? 1.15 : 1,
            }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 10 },
            }}
          >
            <Image
              src={img}
              alt={`img-${idx}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
