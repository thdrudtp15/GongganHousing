'use client';

import type { Dispatch, SetStateAction  } from 'react';
import Image from 'next/image';
import ImageDetailModalCarousel from './embla/ImageDetailModalCarousel';
import { MdClear } from "react-icons/md";
import Modal from '@/wrappers/Modal';

type Props = {
  images: { id: number; image: string }[];
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number | null>>;
};

const PortfolioImagesModal = ({ images, imageIndex, setImageIndex }: Props) => {

  return (
      <Modal handleClose={() => setImageIndex(null)}>
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
    </Modal>
  );
};

export default PortfolioImagesModal;
