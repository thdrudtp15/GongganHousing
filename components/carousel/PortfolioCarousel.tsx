'use client';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';

import {formatDate} from '@/lib/utils/formatDate';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { MdArrowForwardIos } from 'react-icons/md';

import type { Portfolio } from '@/types/portfolio';

const OPTIONS: EmblaOptionsType = { align: 'start' };


const PortfolioCarousel  = ({slides} : {slides : Portfolio[]}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Autoplay({ delay: 3000 })]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section className="w-full max-w-270">
      <div className="mb-4" ref={emblaRef}>
        <div className="flex gap-4">
          {slides.map((slide : Portfolio) => (
            <div className="flex-[0_0_100%] aspect-[1.5/1] md:flex-[0_0_35%] min-w-0" key={slide.id}>
              <div className="relative w-full h-full">
                <div
                  className="opacity-0 absolute w-full h-full z-[2] bg-[rgba(0,0,0,0.7)]
                                hover:opacity-100 duration-300 p-4 flex flex-col justify-end"
                >
                  <h3 className="text-white text-2xl font-bold">{slide.title}</h3>
                  <p className="text-[gray]">{formatDate(slide.started_at)} ~ {formatDate(slide.completed_at)}</p>
                  <p className="text-white">{slide.category}</p>
                </div>
                <Image src={slide.cover} fill priority alt="시공사례 이미지" className="object-cover z-[1]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex">
        <div className="flex gap-4 w-full">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : '',
              )}
            >
              <div
                className={`cursor-pointer bg-gray-200 p-[6] ${
                  selectedIndex === index ? 'bg-gray-700' : ''
                }`}
              ></div>
            </DotButton>
          ))}
        </div>
        <div className="flex justify-end bg-yellow w-full">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}>
            <div className="p-2 shadow-sm cursor-pointer ">
              <MdArrowForwardIos className="m-auto rotate-180" />
            </div>
          </PrevButton>
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}>
            <div className="p-2 shadow-sm cursor-pointer">
              <MdArrowForwardIos className="m-auto" />
            </div>
          </NextButton>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCarousel;
