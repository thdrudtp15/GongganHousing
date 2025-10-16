'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import Button from '../ui/Button';

import type { ReactNode } from 'react';

const ServiceItem = ({
  title,
  desc,
  start,
  image,
  href,
}: {
  title: string;
  desc: ReactNode;
  start: 'left' | 'right';
  image: StaticImageData;
  href: string;
}) => {
  const { ref, inView } = useInView();

  return (
    <div className="flex flex-col gap-10 relative md:flex-row">
      <motion.div
        initial={{
          translateX: start === 'left' ? -200 : 200,
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
        className={`w-[100%] md:w-[40%] ${
          start === 'left' ? 'md:order-first' : 'md:order-last'
        } order-first`}
      >
        <h2 className="text-4xl mb-4 font-bold">{title}</h2>
        <div className="text-xl mb-4 text-gray-500">{desc}</div>
        <Button className="py-4">
          <Link
            href={href}
            className="relative flex items-center gap-[12px] z-[3] text-white duration-600"
          >
            시공 사례 보러가기
          </Link>
        </Button>
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
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </motion.div>
      <div ref={ref} className="absolute top-[0%]"></div>
    </div>
  );
};

export default ServiceItem;
