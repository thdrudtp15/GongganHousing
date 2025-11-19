import Image from 'next/image';

import type { Portfolio } from '@/types/portfolio';
import Link from 'next/link';

import { formatDate } from '@/lib/utils/formatDate';
import React from 'react';

const PortfolioItem = ({ data }: { data: Portfolio }) => {
  return (
    <Link href={`/portfolio/${data.id}`}>
      <article className="group">
        {data.cover && (
          <div className="w-full aspect-[16/9] relative overflow-hidden">
            <Image
              src={data.cover}
              alt={`시공사례 ${data.title} 이미지`}
              fill
              className="object-cover group-hover:scale-[1.2] duration-300"
              loading="lazy"
              sizes="100vw"
            />
          </div>
        )}
        <div className="shadow-lg p-4">
          <h3 className="text-1xl font-bold">{data.title}</h3>
          {data.started_at && data.completed_at && (
            <p className="text-gray-500 text-sm mb-2">
              {formatDate(data.started_at)}~{formatDate(data.completed_at)}
            </p>
          )}
          <p className="border border-gray-300 w-fit py-2 px-4 text-sm text-gray-500">
            {data.category}
          </p>
        </div>
      </article>
    </Link>
  );
};

// 스켈레톤 UI
export const PortfolioSkeleton = () => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <article key={i} className="animate-pulse">
            <div className="w-full aspect-[16/9] relative overflow-hidden bg-gray-200" />
            <div className="shadow-lg p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-9 bg-gray-200 rounded w-20" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const PortfolioGrid = ({ portfolioData }: { portfolioData: Portfolio[] }) => {
  if (!portfolioData || portfolioData.length < 1) {
    return (
      <div className="w-full flex items-center justify-center h-100">검색 결과가 없습니다.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 mt-4">
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
