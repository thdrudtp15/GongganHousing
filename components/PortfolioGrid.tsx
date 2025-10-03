import dummy1 from '@/public/images/project_1.jpg';
import Image from 'next/image';

import type { Portfolio } from '@/types/portfolio';
import Link from 'next/link';

import { formatDate } from '@/lib/utils/formatDate';
import React from 'react';

const PortfolioItem = ({ data }: { data: Portfolio }) => {
  return (
    <Link href={`/portfolio/${data.id}`}>
      <article className="group">
        <div className="w-full aspect-[16/9] relative overflow-hidden">
          <Image
            src={dummy1}
            alt={`시공사례 ${data.title} 이미지`}
            fill
            className="object-cover group-hover:scale-[1.2] duration-300"
          />
        </div>
        <div className="shadow-lg p-4">
          <h3 className="text-1xl font-bold">{data.title}</h3>
          <p className="text-gray-500 text-sm mb-2">
            {formatDate(data.created_at)}~{formatDate(data.completed_at)}
          </p>
          <p className="border border-gray-300 w-fit py-2 px-4 text-sm text-gray-500">
            {data.category}
          </p>
        </div>
      </article>
    </Link>
  );
};

const PortfolioGrid = ({ portfolioData }: { portfolioData: Portfolio[] }) => {
  if (!portfolioData || portfolioData.length < 1) {
    return (
      <div className="w-full flex items-center justify-center h-100">검색 결과가 없습니다.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20 mt-4">
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
