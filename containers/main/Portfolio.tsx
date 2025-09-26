'use client';

import Section from '@/wrappers/Section';
import useEmblaCarousel from 'embla-carousel-react';

const Portfolio = () => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <Section className="py-28 px-8">
      <Section.Content>
        <div></div>
      </Section.Content>
    </Section>
  );
};

export default Portfolio;
