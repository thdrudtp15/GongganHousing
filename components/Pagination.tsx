import { notFound } from 'next/navigation';

import Link from 'next/link';
import { ReactNode } from 'react';

import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';

type Props = {
  totalPages: number;
  nowPage?: string | number;
};

const PaginationItem = ({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) => {
  const Classes = `flex items-center justify-center 
                 w-[32px] h-[32px] rounded-[8px] bg-[#ffffff]
                 ${
                   href
                     ? 'hover:bg-(--identity) hover:text-[#ffffff] text-[#222222]'
                     : ''
                 }`;

  if (!href) return <button className={Classes}>{children}</button>;

  return (
    <Link className={Classes} href={href}>
      {children}
    </Link>
  );
};

const Pagination = ({ totalPages, nowPage = 1 }: Props) => {
  nowPage = +nowPage;

  if (nowPage > totalPages) {
    notFound();
  }

  const sequentialPagination = (type: 'prev' | 'next') => {
    if (type === 'next' && nowPage < totalPages) {
      return `?page=${nowPage + 1}`;
    } else if (type === 'prev' && nowPage !== 1) {
      return `?page=${nowPage - 1}`;
    }
    return '';
  };

  const pageLimit = 5; // 페이지 네이션 표시 개수
  const pageArray: number[] = [];

  const index = Math.floor((nowPage - 1) / pageLimit);

  for (let i = index * pageLimit; i < (index + 1) * pageLimit; i++) {
    if (i < totalPages) pageArray.push(i + 1);
  }

  return (
    <div className={'flex gap-[5px] items-center'}>
      <PaginationItem href={`?page=1`}>
        <MdKeyboardDoubleArrowLeft />
      </PaginationItem>
      <PaginationItem href={sequentialPagination('prev')}>
        <MdKeyboardArrowLeft />
      </PaginationItem>
      <ul className={'flex gap-[5px] items-center'}>
        {pageArray.map((page) => (
          <li key={page}>
            <PaginationItem href={`?page=${page}`}>{page}</PaginationItem>
          </li>
        ))}
        {nowPage < totalPages - 4 && (
          <>
            <PaginationItem>...</PaginationItem>
            <PaginationItem href={`?page=${totalPages}`}>
              {totalPages}
            </PaginationItem>
          </>
        )}
      </ul>
      <PaginationItem href={sequentialPagination('next')}>
        <MdKeyboardArrowRight />
      </PaginationItem>
      <PaginationItem href={`?page=${totalPages}`}>
        <MdKeyboardDoubleArrowRight />
      </PaginationItem>
    </div>
  );
};

export default Pagination;
