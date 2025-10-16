import Image from 'next/image';

import logoImg from '@/public/svgs/logo_b.svg';
import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu';

const navItems = [
  { name: '사업 영역', href: '/#사업영역' },
  { name: '시공 사례', href: '/portfolio' },
  { name: '상담문의', href: '/inquiry' },
];

const Header = () => {
  return (
    <header
      className={`flex w-full h-20 px-[2rem] fixed z-[3] bg-white transition duration-300 shadow-lg`}
    >
      <div className="max-w-[1080px] w-full m-auto flex justify-between items-center">
        <Link href={'/'} className="flex gap-4 items-center">
          <Image
            src={logoImg}
            width={80}
            priority
            alt="logo"
            className={`group-hover:filter transition duration-300`}
          />

          <p className="text-2xl font-bold">공간하우징</p>
        </Link>
        <nav className="hidden sm:flex items-center">
          <ul className="gap-8 md:gap-12 flex">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`relative text-lg font-medium tracking-wide transition-all duration-300 
                 after:content-[''] after:absolute after:w-0 after:h-0.5 
                 after:bg-black
                 after:left-1/2 after:bottom-[-4px] after:transition-all after:duration-300 
                 hover:after:w-full hover:after:left-0
                 text-sm sm:text-lg
                 `}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <HamburgerMenu navItems={navItems} />
      </div>
    </header>
  );
};

export default Header;
