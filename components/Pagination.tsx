'use client';

import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import useQueryParams from '@/lib/utils/useQueryParams';

import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';

type Props = {
  pageSize: number;
  totalCount: number;
  nowPage?: string | number;
};

const PaginationItem = ({
  children,
  handleClick,
  select,
}: {
  children: ReactNode;
  handleClick?: () => void;
  select?: boolean;
}) => {
  const Classes = `flex items-center justify-center 
                 w-[32px] h-[32px] rounded-[8px] ${
                   select ? 'bg-(--identity) text-white' : 'bg-white'
                 }
                 ${handleClick ? 'hover:bg-(--identity) hover:text-white' : ''}
                 
                 `;

  if (!handleClick) return <button className={Classes}>{children}</button>;

  return (
    <button className={Classes} onClick={handleClick}>
      {children}
    </button>
  );
};

const Pagination = ({ pageSize, totalCount, nowPage = 1 }: Props) => {
  nowPage = +nowPage;

  const totalPages = (totalCount && Math.ceil(totalCount / pageSize)) || 1;

  if (nowPage > totalPages) {
    notFound();
  }

  const { handleQueryParams } = useQueryParams();

  const pageLimit = 5; // 페이지 네이션 표시 개수
  const pageArray: number[] = [];

  const index = Math.floor((nowPage - 1) / pageLimit);

  for (let i = index * pageLimit; i < (index + 1) * pageLimit; i++) {
    if (i < totalPages) pageArray.push(i + 1);
  }

  return (
    <div className={'flex gap-[5px] items-center mx-auto w-fit'}>
      <PaginationItem
        handleClick={() => {
          if (nowPage > 1) handleQueryParams({ queryObj: { page: 1 }});
        }}
      >
        <MdKeyboardDoubleArrowLeft />
      </PaginationItem>
      <PaginationItem
        handleClick={() => {
          if (nowPage > 1) handleQueryParams({ queryObj: { page: nowPage - 1 } });
        }}
      >
        <MdKeyboardArrowLeft />
      </PaginationItem>
      <ul className={'flex gap-[5px] items-center'}>
        {pageArray.map((page) => (
          <li key={page}>
            <PaginationItem
              select={page === nowPage}
              handleClick={() => handleQueryParams({ queryObj: { page } })}
            >
              {page}
            </PaginationItem>
          </li>
        ))}
        {nowPage < totalPages - 4 && (
          <>
            <PaginationItem>...</PaginationItem>
            <PaginationItem
              handleClick={() => handleQueryParams({ queryObj: { page: totalPages } })}
            >
              {totalPages}
            </PaginationItem>
          </>
        )}
      </ul>
      <PaginationItem
        handleClick={() => {
          if (nowPage < totalPages) handleQueryParams({ queryObj: { page: nowPage + 1 } });
        }}
      >
        <MdKeyboardArrowRight />
      </PaginationItem>
      <PaginationItem
        handleClick={() => {
          if (nowPage < totalPages) handleQueryParams({ queryObj: { page: totalPages } });
        }}
      >
        <MdKeyboardDoubleArrowRight />
      </PaginationItem>
    </div>
  );
};

export default Pagination;
