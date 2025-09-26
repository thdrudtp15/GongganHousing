'use client';
import Image, {
  StaticImageData,
} from 'next/image';
import {
  useRef,
  useState,
  useEffect,
} from 'react';
import { ReactNode } from 'react';

interface ServiceItemProps {
  children: ReactNode;
  image: StaticImageData;
}

const ServiceItem = ({
  children,
  image,
}: ServiceItemProps) => {
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)')
      .matches;

  const ref = useRef<HTMLLIElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(
    null,
  );
  const [visible, setVisible] = useState(false);

  // 목표 좌표
  const targetX = useRef(0);
  const targetY = useRef(0);

  // 현재 좌표
  const currentX = useRef(0);
  const currentY = useRef(0);

  const handleMouseMove = (
    e: React.MouseEvent,
  ) => {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();
    targetX.current = e.clientX - rect.left;
    targetY.current = e.clientY - rect.top;
  };

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (imgRef.current) {
        // lerp로 부드럽게 이동
        currentX.current +=
          (targetX.current - currentX.current) *
          0.2;
        currentY.current +=
          (targetY.current - currentY.current) *
          0.2;

        imgRef.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;
      }
      animationFrame =
        requestAnimationFrame(animate);
    };

    animate();

    return () =>
      cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <li
      ref={ref}
      onMouseEnter={() =>
        isMobile || setVisible(true)
      }
      onMouseLeave={() =>
        isMobile || setVisible(false)
      }
      onMouseMove={handleMouseMove}
      className="relative py-[32px] text-[#0B1C30] font-medium text-[40px] border-b-[1px] border-[#8e8e8e]"
    >
      {children}

      <div
        ref={imgRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          opacity: visible ? 1 : 0,
          zIndex: 9999,
          transition: '0.5s ease-out',
          transform: 'translate(0,0)',
        }}
      >
        <Image src={image} alt="" />
      </div>
    </li>
  );
};

export default ServiceItem;
