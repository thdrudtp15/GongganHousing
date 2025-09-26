'use client';
import Image from 'next/image';
import inquiryImg from '@/public/images/inquiry.jpg';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';

type AchivementItemProps = {
  value?: number;
  duration?: number;
  suffix: string;
  title: string;
};

const AchivementItem = ({
  value = 100,
  duration = 2,
  suffix,
  title,
}: AchivementItemProps) => {
  const count = useMotionValue(0); // 애니메이션할 값
  const rounded = useTransform(count, Math.round); // 소수점 없이 반올림

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
    });
    return controls.stop; // 컴포넌트 언마운트 시 애니메이션 정지
  }, [count, 0, duration]);

  return (
    <div>
      <span className="text-[60px] text-[#ffffff] font-bold">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
      <h3 className="text-[20px] text-[#ffffff] font-medium">
        {title}
      </h3>
    </div>
  );
};

const Achivements = () => {
  const { ref, inView } = useInView();

  return (
    <div className="w-full h-[800px] relative hidden md:block">
      <Image
        src={inquiryImg}
        alt="inquiry image"
        fill
        className="object-cover"
        priority
      />
      <div
        className="absolute top-0 w-full h-full left-0 flex flex-col py-[100px] px-[60px] justify-between bg-[rgba(0,0,0,0.6)]"
        ref={ref}
      >
        <div className="flex flex-col gap-[80px] h-full">
          {inView && (
            <>
              <AchivementItem
                value={5}
                title="경력"
                suffix="년"
              />
              <AchivementItem
                value={23}
                title="프로젝트"
                suffix="+"
              />
              <AchivementItem
                value={90}
                title="만족도"
                suffix="%"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Achivements;
