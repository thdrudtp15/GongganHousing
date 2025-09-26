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
    <div className="flex gap-10 relative">
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
            ? 'order-first'
            : 'order-last'
        }`}
      >
        <h2 className="text-6xl mb-4 font-bold">
          {title}
        </h2>
        <div className="text-2xl mb-10">
          {desc}
        </div>
        <button>시공 사례</button>
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
        className="w-[60%] h-100 bg-black relative"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-fit"
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
