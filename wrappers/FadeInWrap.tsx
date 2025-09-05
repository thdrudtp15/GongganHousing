'use client';

import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

const FadeInWrap = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <div
      className={`${
        inView
          ? 'animate-(--fade-in)'
          : 'animate-(--fade-out)'
      } `}
    >
      <div ref={ref}></div>
      {children}
    </div>
  );
};

export default FadeInWrap;
