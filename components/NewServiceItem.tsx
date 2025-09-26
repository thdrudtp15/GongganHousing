'use client';

import type { ReactNode } from 'react';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

const NewServiceItem = ({
  title,
  desc,
  start,
  image,
}: {
  title: string;
  desc: ReactNode;
  start: 'left' | 'right';
  image: StaticImageData;
}) => {
  const { ref, inView } = useInView();

  return (
    <div className="flex flex-col gap-10 relative md:flex-row">
      <motion.div
        initial={{
          translateX:
            start === 'left' ? -200 : 200,
          opacity: 0,
        }}
        animate={
          inView && {
            opacity: 1,
            translateX: 0,
          }
        }
        transition={{
          opacity: { duration: 1 },
          translateX: { duration: 1 },
        }}
        className={`w-[40%] ${
          start === 'left'
            ? 'md:order-first'
            : 'md:order-last'
        } order-first`}
      >
        <h2 className="text-4xl mb-4 font-bold">
          {title}
        </h2>
        <div className="text-2xl mb-4 text-gray-500">
          {desc}
        </div>
        <button
          className="group
                  bg-(--identity)
                  overflow-hidden relative border       
                  px-[30px] py-[20px] text-[#ffffff]
                  hover:text-[transparent]
                  transition duration-400
                  cursor-pointer
                  "
        >
          <p className="relative flex items-center gap-[12px] z-[3] text-white duration-600">
            시공 사례 보러가기
          </p>
        </button>
      </motion.div>
      <motion.div
        initial={{
          translateY: 200,
          opacity: 0,
        }}
        animate={
          inView && {
            opacity: 1,
            translateY: 0,
          }
        }
        transition={{
          opacity: { duration: 1, delay: 0.5 },
          translateY: { duration: 1, delay: 0.5 },
        }}
        className="w-[100%] h-80 bg-black relative md:w-[60%]"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </motion.div>
      <div
        ref={ref}
        className="absolute top-[50%]"
      ></div>
    </div>
  );
};

export default NewServiceItem;
