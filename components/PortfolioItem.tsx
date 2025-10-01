import dummy1 from '@/public/images/project_1.jpg';
import Image from 'next/image';

import type { Portfolio } from '@/types/portfolio';
import Link from 'next/link';

import { formatDate } from '@/lib/utils/formatDate';
import React from 'react';

const PortfolioItem = ({ data }: { data: Portfolio }) => {
  return (
    <article
      className={`w-full flex flex-col md:flex-row py-6 border-b border-gray-300  gap-6    `}
    >
      {/* 이미지 섹션 */}
      <Link
        href={`/portfolio/${data.id}`}
        className="w-[100%] aspect-[1/1] md:w-[20%] md:aspect-[1.2/1]  overflow-hidden relative rounded-sm bg-gray-100"
      >
        <Image
          src={dummy1}
          alt={'imageAlt'}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px)  432px, 320px"
        />
      </Link>

      {/* 콘텐츠 섹션 */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold text-gray-900">{data.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{'설명'}</p>
        </div>

        <div className="mb-10">
          <time className="text-xs text-gray-500 font-medium ">{formatDate(data.created_at)}</time>
        </div>

        <Link href={`/portfolio/${data.id}`}>View More</Link>
      </div>
    </article>
  );
};

const PortfolioGrid = ({ portfolioData }: { portfolioData: Portfolio[] }) => {
  if (!portfolioData || portfolioData.length < 1) {
    return (
      <div className="w-full flex items-center justify-center h-100">검색 결과가 없습니다.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-1 gap-8 mb-20">
      {portfolioData &&
        portfolioData.map((portfolio) => (
          <React.Fragment key={portfolio.id}>
            <PortfolioItem data={portfolio} />
          </React.Fragment>
        ))}
    </div>
  );
};

export default PortfolioGrid;
