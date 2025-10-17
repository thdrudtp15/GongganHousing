'use client';

import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import ImageDetailModalCarousel from '@/components/carousel/ImageDetailModalCarousel';
import { MdClear } from 'react-icons/md';
import Modal from '@/components/ui/Modal';
import type { PortfolioImages } from '@/types/portfolio';

type Props = {
  images: PortfolioImages[];
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number | null>>;
};

const PortfolioImagesModal = ({ images, imageIndex, setImageIndex }: Props) => {
  return (
    <Modal handleClose={() => setImageIndex(null)}>
      <MdClear
        fontSize={36}
        color="white"
        className="absolute top-5 cursor-pointer right-15"
        onClick={() => setImageIndex(null)}
      />
      <div className="relative w-full max-w-4xl h-[70vh] mb-10">
        {images[imageIndex].image && (
          <Image
            src={images[imageIndex].image}
            fill
            alt={`시공 사례 ${imageIndex}번째 이미지`}
            className="object-contain" // 이미지 전체 표시
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        )}
      </div>
      <ImageDetailModalCarousel
        images={images}
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
      />
    </Modal>
  );
};

export default PortfolioImagesModal;
