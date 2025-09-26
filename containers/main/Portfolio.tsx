'use client';

import Section from '@/wrappers/Section';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

import dummy from '@/public/images/hero_3.jpg';

const Portfolio = () => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <Section className="bg-blue-50 relative h-80">
      <Image
        src={dummy}
        fill
        alt="section"
        className="object-cover"
      />
    </Section>
  );
};

export default Portfolio;
