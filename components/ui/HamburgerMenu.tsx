'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MdMenu, MdClose } from 'react-icons/md';
import useOnClickOutside from '@/hooks/useOutsideClick';
import { useRouter } from 'next/navigation';

const HamburgerMenu = ({ navItems }: { navItems: { name: string; href: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside({ ref, onClickOutside: () => setIsOpen(false) });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="sm:hidden" ref={ref}>
      {isOpen ? (
        <MdClose fontSize={32} onMouseDown={() => setIsOpen(!isOpen)} className="cursor-pointer" />
      ) : (
        <MdMenu fontSize={32} onMouseDown={() => setIsOpen(!isOpen)} className="cursor-pointer" />
      )}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
          <ul className="flex flex-col gap-4 p-6">
            {navItems.map((item) => (
              <li key={item.name} className="w-full">
                <Link
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="text-black text-lg font-medium border-b border-gray-200 w-full block pb-4"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
