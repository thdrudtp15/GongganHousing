import Image from 'next/image';
import ContentWrap from '@/wrappers/ContentWrap';

import logoImg from '@/public/svgs/logo_c.svg';
import Link from 'next/link';

const navItems = [
  { name: '회사소개', href: '/about' },
  { name: '상담문의', href: '/inquiry' },
  { name: '시공 사례', href: '/portfolio' },
];

const Header = () => {
  return (
    <header className="w-full  px-[2rem] absolute z-[3]">
      <ContentWrap className="flex justify-between py-[2rem] items-center">
        <Link href={'/'}>
          <Image
            src={logoImg}
            width={100}
            height={20}
            priority
            alt="logo"
          />
        </Link>
        <nav>
          <ul className="flex gap-8 md:gap-12">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="relative text-white text-lg font-medium tracking-wide transition-all duration-300 
                hover:text-gray-200 after:content-[''] after:absolute after:w-0 after:h-0.5 
                after:bg-white after:left-1/2 after:bottom-[-4px] after:transition-all after:duration-300 
                hover:after:w-full hover:after:left-0"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </ContentWrap>
    </header>
  );
};

export default Header;
