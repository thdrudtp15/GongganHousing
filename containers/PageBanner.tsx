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
  select,
  root,
}: {
  category: { title: string; path: string }[];
  select: string;
  root: string;
}) => {
  return (
    <nav className="w-full flex justify-center items-center p-4 gap-8 border-b border-gray-300">
      {category.map((item) => (
        <Link
          className={`${
            select === item.path
              ? 'font-bold'
              : ''
          }`}
          key={item.title}
          href={`${root}${item.path}`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

PageBanner.Category = Category;
