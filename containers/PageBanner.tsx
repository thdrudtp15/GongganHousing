import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

const PageBanner = ({
  children,
  image,
}: {
  children: ReactNode;
  image?: StaticImageData;
}) => {
  return (
    <section className="relative h-[600px] overflow-hidden w-full flex items-center justify-center">
      {image && (
        <Image
          src={image}
          fill
          alt="banner image"
          className="object-cover z-[-1]  animate-(--scale-up)"
          priority
        />
      )}
      <h2 className="font-bold text-[80px] text-[#ffffff]">{children}</h2>
    </section>
  );
};

export default PageBanner;
