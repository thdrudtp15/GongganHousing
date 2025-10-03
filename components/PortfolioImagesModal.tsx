'use client';

import type { Dispatch, SetStateAction, MouseEvent } from 'react';
import Image from 'next/image';

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
      <Image
        src={images[imageIndex].image}
        width={700}
        height={500}
        alt={`시공 사례 ${imageIndex}번째 이미지`}
        className="mb-20"
      />
      <div className="flex gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative w-25 h-15 hover:border hover:border-2 border-blue-500 overflow-hidden rounded-lg"
            onClick={() => setImageIndex(index)}
          >
            <Image src={image.image} alt="미리보기 이미지" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioImagesModal;
