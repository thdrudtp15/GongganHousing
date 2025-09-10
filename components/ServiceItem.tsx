'use client';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ReactNode } from 'react';

interface ServiceItemProps {
  children: ReactNode;
  image: StaticImageData;
}

const ServiceItem = ({ children, image }: ServiceItemProps) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mouseX = 0,
      mouseY = 0;
    let imgX = mouseX,
      imgY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      // 이미지 위치를 마우스 바로 옆으로 초기화
      imgX = e.clientX + 10;
      imgY = e.clientY + 10;
      mouseX = imgX;
      mouseY = imgY;
    };
    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (imgRef.current && visible) {
        // 선형 보간(LERP)로 부드럽게 이동
        imgX += (mouseX - imgX) * 0.1;
        imgY += (mouseY - imgY) * 0.1;
        imgRef.current.style.transform = `translate(${imgX}px, ${imgY}px)`;
        imgRef.current.style.opacity = '1';
      } else if (imgRef.current) {
        imgRef.current.style.opacity = '0';
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [visible]);

  return (
    <>
      <li
        ref={ref}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="py-[32px] font-medium text-[40px] border-b-[1px] border-[#8e8e8e]"
      >
        {children}
      </li>
      {visible && (
        <div
          ref={imgRef}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            opacity: 0,
            top: 0,
            left: 0,
            zIndex: 9999,
            transition: '1.5s opacity ',
            transform: 'translate(0,0)',
          }}
        >
          <Image src={image} alt="" />
        </div>
      )}
    </>
  );
};

export default ServiceItem;
