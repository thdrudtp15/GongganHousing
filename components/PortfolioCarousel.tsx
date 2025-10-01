'use client';
import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const PortfolioCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  //   useEffect(() => {
  //     if (emblaApi) {
  //       console.log(emblaApi.slideNodes()); // Access API
  //     }
  //   }, [emblaApi]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex text-white">
        <div className="flex-[0_0_25%] min-w-0">Slide 1</div>
        <div className="flex-[0_0_25%] min-w-0">Slide 2</div>
        <div className="flex-[0_0_25%] min-w-0">Slide 3</div>
      </div>
    </div>
  );
};

export default PortfolioCarousel;
