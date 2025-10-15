import Image, {
  StaticImageData,
} from 'next/image';
import Link from 'next/link';
import {Fragment, ReactNode } from 'react';
import { MdOutlineHome, MdKeyboardArrowRight } from "react-icons/md";

const PageBanner = ({
  title,
  children,
  image,
}: {
  title : string,
  children?: ReactNode;
  image?: StaticImageData;
}) => {
  return (
      <section className="relative h-90 md:h-120 pt-20 overflow-hidden w-full">
        {image && (
          <Image
            src={image}
            fill
            alt="banner image"
            className="object-cover z-[-1]"
            priority
          />
        )}
        <div className='absolute pt-20 top-0 left-0 w-full h-full 
                        bg-[rgba(0,0,0,0.2)] flex items-center 
                        justify-center z-[2] flex-col gap-2'>
          <h1 className="font-bold text-3xl md:text-6xl text-white text-shadow-lg">
            {title}
          </h1>
          {children}
        </div>      
      </section>
  );
};

export default PageBanner;

const Description = ({
  description,
}: {
  description: string;
}) => {
  return <p className='text-md sm:text-lg md:text-2lg text-gray-100 font-thin'>{description}</p>;
};

const Breadcrumb = ({
  breadcrumb,
}: {
  breadcrumb: { title: string; path?: string }[];
}) => {

  if(breadcrumb.length === 0) return null;

  return (
    <nav className="w-full flex justify-center items-center gap-2 text-white">
        <Link className='z-[60]' href='/'>
          <MdOutlineHome fontWeight={100} fontSize={20}/>
        </Link>
        <MdKeyboardArrowRight fontSize={20}/>
        {breadcrumb.map((item, index) => (
         <Fragment key={item.title}>
           {item.path 
                    ? <Link href={item.path} className='text-sm'>{item.title}</Link> 
                    : <span className='text-sm'>{item.title}</span>}
            {index !== breadcrumb.length - 1 && <MdKeyboardArrowRight fontSize={20}/>}
         </Fragment>
        ))}
    </nav>
  );
};


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


PageBanner.Breadcrumb = Breadcrumb;
PageBanner.Category = Category;
PageBanner.Description = Description;
