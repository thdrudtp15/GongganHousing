'use client';
import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import PortfolioImagesModal from './PortfolioImagesModal';


type Props = {
  images: {
    id: number;
    image: string;
  }[];
};

const PortfolioDetailImageGrid = ({ images }: Props) => {
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  if (images.length < 1) {
    return (
      <div className="w-full h-100 flex items-center justify-center">등록된 이미지가 없습니다.</div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {images &&
          images.map((image, index) => (
            <div className="relative h-70 group" key={image.id}>
              <div
                className="absolute w-full h-full z-[2] opacity-0
                 duration-300 flex items-center justify-center cursor-pointer
                 group-hover:bg-[rgba(0,0,0,0.7)] group-hover:opacity-100 "
                onClick={() => setImageIndex(index)}
              >
                <p className="text-white font-bold text-2xl">클릭하여 자세히 보기</p>
              </div>
              <Image src={image.image} fill alt="이미지" className="object-cover z-[1]" />
            </div>
          ))}
      </div>
      {typeof imageIndex === 'number' && (
        <PortfolioImagesModal
          images={images}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
        />
      )}
    
    </>
  );
};

export default PortfolioDetailImageGrid;
