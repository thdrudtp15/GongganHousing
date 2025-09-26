import Image, {
  StaticImageData,
} from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

const PageBanner = ({
  children,
  image,
}: {
  children: ReactNode;
  image?: StaticImageData;
}) => {
  return (
    <section className="relative h-100 overflow-hidden w-full flex items-center justify-center shadow-lg">
      {image && (
        <Image
          src={image}
          fill
          alt="banner image"
          className="object-cover z-[-1]"
          priority
        />
      )}
      <h2 className="font-bold text-6xl text-[#ffffff]">
        {children}
      </h2>
    </section>
  );
};

export default PageBanner;

const Category = ({
  category,
}: {
  category: { title: string; href: string }[];
}) => {
  return (
    <nav>
      {category.map((item) => (
        <Link key={item.title} href={item.href}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

PageBanner.Category = Category;
