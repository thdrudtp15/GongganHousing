'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import logoImg from '@/public/svgs/logo_c.svg';
import Link from 'next/link';

const navItems = [
  { name: '회사소개', href: '/about/overview' },
  { name: '시공 사례', href: '/portfolio' },
  { name: '사업 영역', href: '/#사업영역' },
  { name: '상담문의', href: '/inquiry' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener(
      'scroll',
      handleScroll,
    );
    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll,
      );
  }, []);

  return (
    <header
      className={`group  w-full px-[2rem] fixed z-[3] transition duration-300 ${
        scrolled
          ? 'bg-white shadow-lg'
          : 'hover:bg-white'
      }`}
    >
      <div className="max-w-[1080px] m-auto flex justify-between py-4 items-center">
        <Link href={'/'}>
          <Image
            src={logoImg}
            width={60}
            // height={20}
            priority
            alt="logo"
            className={`group-hover:filter transition duration-300 ${
              !scrolled
                ? 'group-hover:brightness-0'
                : 'brightness-0'
            }`}
          />
        </Link>
        <nav>
          <ul className="flex gap-8 md:gap-12">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`relative ${
                    scrolled
                      ? 'text-black'
                      : 'text-white group-hover:text-black'
                  } text-lg font-medium tracking-wide transition-all duration-300 
                 after:content-[''] after:absolute after:w-0 after:h-0.5 
                 after:bg-black
                 after:left-1/2 after:bottom-[-4px] after:transition-all after:duration-300 
                 hover:after:w-full hover:after:left-0`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
