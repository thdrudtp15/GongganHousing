'use client';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { usePrevNextButtons } from './EmblaCarouselArrowButtons';


import type { ReactNode } from "react";

import Image, { StaticImageData } from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

const OPTIONS: EmblaOptionsType = { align: 'start' };

type PropType = {
  slides: StaticImageData[];

};

const Overlay = ({children} : {children? : ReactNode}) => {
  return (
  <div className="absolute w-full h-full bg-[rgba(0,0,0,0.5)] z-[2] px-8">
    <div className="max-w-[1080px] m-auto flex flex-col h-full justify-center">
      <h1 className="text-white font-bold text-3xl md:text-6xl text-shadow-2xl">공간에 가치를 더하다.</h1>
      <p className="text-white text-sm sm:text-md md:text-lg">
        전문성과 투명성을 바탕으로 고객만을 생각합니다.
      </p>
        {children}
    </div>
  </div>)
}


const HeroCarousel: React.FC<PropType> = (props) => {
    const {slides} = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Autoplay({ delay: 5000 }), Fade()]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  
  return (
    <section className="w-full h-full relative">
      {/** 오버레이 */}
      <Overlay>
        <div className="flex w-full absolute gap-10 bottom-10">
          <div className="flex gap-4 ">
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
        </div>
      </Overlay>

      {/** 슬라이드 */}
      <div ref={emblaRef} >
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="flex-[0_0_100%] min-w-0" key={index}>
                <motion.div
                    className="relative w-full h-90 md:h-120 overflow-hidden"
                    initial={{               
                        scale: 1,
                    }}
                    animate={{             
                        scale: selectedIndex === index ? 1.1 : 1,
                    }}
                    transition={{                 
                        scale: { duration: 10 },
                    }}
                >
                  <Image src={slide.src} fill priority alt="시공사례 이미지" className="object-cover z-[1]" />       
                </motion.div>    
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
