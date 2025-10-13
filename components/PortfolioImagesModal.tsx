'use client';

import type { Dispatch, SetStateAction, MouseEvent } from 'react';
import Image from 'next/image';
import ImageDetailModalCarousel from './embla/ImageDetailModalCarousel';
import { MdClear } from "react-icons/md";


type Props = {
  images: { id: number; image: string }[];
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number | null>>;
};

const PortfolioImagesModal = ({ images, imageIndex, setImageIndex }: Props) => {
  const handleClose = (e: MouseEvent) => {
    const { id } = e.target as HTMLElement;
    if (id === 'overlay') setImageIndex(null);
  };

  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.9)] z-[10] flex flex-col justify-center items-center p-10"
      id="overlay"
      onClick={(e) => handleClose(e)}
    >
      <MdClear fontSize={36} color='white' className='absolute top-5 cursor-pointer right-15' onClick={() => setImageIndex(null)} />
      <div className="relative w-full max-w-4xl h-[70vh] mb-10">
          <Image
            src={images[imageIndex].image}
            fill
            alt={`시공 사례 ${imageIndex}번째 이미지`}
            className="object-contain" // 이미지 전체 표시
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
      </div>
      <ImageDetailModalCarousel images={images} imageIndex={imageIndex} setImageIndex={setImageIndex} />
    </div>
  );
};

export default PortfolioImagesModal;
