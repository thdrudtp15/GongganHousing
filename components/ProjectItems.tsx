'use client';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

import dummy_projectImg1 from '@/public/images/project_1.jpg';
import dummy_projectImg2 from '@/public/images/project_2.jpg';
import dummy_projectImg3 from '@/public/images/project_3.jpg';
import dummy_projectImg4 from '@/public/images/project_4.jpg';

const Item = ({
  data,
  dependence,
}: {
  data?: {
    image: StaticImageData;
  };
  dependence?: boolean;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: dependence,
  });

  if (!data) return;

  return (
    <article
      className={`group relative w-full h-full aspect-[1.22/1] overflow-hidden ${
        inView ? 'animate-(--fade-in)' : 'animate-(--fade-out)'
      }`}
    >
      <Image
        src={data.image}
        alt="project image"
        fill
        className="group-hover:scale-110 w-full h-full object-cover transition duration-700"
      />

      <div
        className="group-hover:opacity-100 absolute top-0 left-0 w-full h-full flex justify-end p-[10%] flex-col 
                   bg-[rgba(0,0,0,0.6)] text-[#ffffff] opacity-0
                   transition duration-700"
      >
        <span className="absolute top-[50%]" ref={ref} />
        <h3 className="font-bold">OOO 도서관</h3>
        <p>OOO 로비</p>
      </div>
    </article>
  );
};

const ProjectItems = () => {
  const { ref, inView, entry } = useInView({
    triggerOnce: false,
  });

  const [animationState, setAnimationState] = useState<boolean>(false);

  useEffect(() => {
    if (!entry) return;
    const { scrollY, innerHeight } = window;
    const nowScroll = scrollY + innerHeight;
    const top = entry.boundingClientRect.top + window.scrollY;

    if (nowScroll > top) {
      setAnimationState(true);
    } else {
      setAnimationState(false);
    }
  }, [entry, inView]);

  return (
    <div className="grid grid-cols-2 gap-[20px]" ref={ref}>
      <Item dependence={animationState} data={{ image: dummy_projectImg1 }} />
      <Item dependence={animationState} data={{ image: dummy_projectImg2 }} />
      <Item dependence={animationState} data={{ image: dummy_projectImg3 }} />
      <Item dependence={animationState} data={{ image: dummy_projectImg4 }} />
      <Item dependence={animationState} data={{ image: dummy_projectImg3 }} />
      <Item dependence={animationState} data={{ image: dummy_projectImg4 }} />
    </div>
  );
};

export default ProjectItems;
