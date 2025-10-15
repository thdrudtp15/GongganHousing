'use client';

import { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { PrevButton, NextButton } from './EmblaCarouselArrowButtons';
import Image from 'next/image';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';


const ImageDetailModalCarousel = ({ 
  images, 
  imageIndex, 
  setImageIndex 
}: { 
  images: { image: string; id?: number }[], 
  imageIndex: number, 
  setImageIndex: (index: number) => void 
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true, // 자유롭게 드래그 가능
  });

  const { 
    prevBtnDisabled, 
    nextBtnDisabled, 
    onPrevButtonClick, 
    onNextButtonClick 
  } = usePrevNextButtons(emblaApi);

  // 선택된 이미지로 스크롤
  const scrollToImage = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  // imageIndex 변경 시 자동 스크롤
  useEffect(() => {
    scrollToImage(imageIndex);
  }, [imageIndex, scrollToImage]);

  // 썸네일 클릭 핸들러
  const handleThumbnailClick = (index: number) => {
    setImageIndex(index);
  };

  return (
    <div className="relative w-full max-w-120 px-12">
      {/* 이전 버튼 */}
      <PrevButton 
        disabled={prevBtnDisabled} 
        className="absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg disabled:opacity-30 transition-all"
        onClick={onPrevButtonClick}
      >
        <MdKeyboardArrowLeft fontSize={24}/>
      </PrevButton>

      {/* 캐러셀 */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {images.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => handleThumbnailClick(index)}
              className={`
                flex-[0_0_30%] w-20 h-20 sm:w-24 sm:h-24 relative rounded-lg overflow-hidden p-1
                transition-all duration-200 cursor-pointer
                ${
                  index === imageIndex 
                    ? 'opacity-100' 
                    : 'opacity-60 hover:opacity-100 '
                }
              `}
            >
              <Image 
                src={image.image} 
                fill 
                alt={`썸네일 ${index + 1}`}
                className="object-cover"
                sizes="(max-width: 640px) 80px, 96px"
              />
              
              {/* 현재 선택된 이미지 표시 */}
            </button>
          ))}
        </div>
      </div>

      {/* 다음 버튼 */}
      <NextButton 
        disabled={nextBtnDisabled} 
        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg disabled:opacity-30 transition-all"
        onClick={onNextButtonClick}
      >
        <MdKeyboardArrowRight fontSize={24}/>
      </NextButton>

      {/* 이미지 카운터 (선택사항) */}
      <div className="text-center mt-2 text-sm text-gray-600">
        {imageIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageDetailModalCarousel;