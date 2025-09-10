import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import logoB from '@/public/svgs/logo_b.svg';
import logoC from '@/public/svgs/logo_c.svg';

const navItems = [
  { name: '회사소개', href: '/' },
  { name: '상담문의' },
  { name: '시공 사례' },
  { name: '오시는 길' },
];

const NavItem = ({ children }: { children: ReactNode }) => {
  return (
    <Link
      href="/"
      className={`
        font-medium 
        px-[24px] 
        py-[12px] 
        text-[#ffffff]
        group-hover:text-[#0b1b30]
        hover:bg-[#0b1b30] 
        hover:text-[#ffffff] 
        transition`}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  return (
    <header
      className={`group hover:bg-[#ffffff] absolute w-full h-[80px] 
                  px-[40px] py-[1rem] flex justify-between items-center 
                  top-0 left-0  z-[2] transition duration-600`}
    >
      <Link href="/">
        <div className="h-[50px] w-[80px] bg-[url(@/public/svgs/logo_c.svg)] group-hover:bg-[url(@/public/svgs/logo_b.svg)]"></div>
      </Link>
      <nav>
        <ul className="flex items-center gap-[20px]">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavItem>{item.name}</NavItem>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
