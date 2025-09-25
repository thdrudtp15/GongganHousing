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
    <header className="w-full  px-[2rem] absolute">
      <ContentWrap className="flex justify-between py-[1rem] items-center">
        <Link href={'/'}>
          <Image
            src={logoImg}
            width={70}
            height={20}
            priority
            alt="logo"
          />
        </Link>
        <ul className="flex gap-[1rem]">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-[#ffffff] text-[1rem]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </ContentWrap>
    </header>
  );
};

export default Header;
