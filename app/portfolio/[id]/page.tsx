import { notFound } from 'next/navigation';
import React from 'react';
import { getPortfolioData_ } from '@/lib/queries/portfolio';
import { formatDate } from '@/lib/utils/formatDate';

import type { Metadata } from 'next';
import PortfolioDetailImageGrid from '@/components/PortfolioDetailImageGrid';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const { data } = await getPortfolioData_(id);

  if (!data) notFound();

  return {
    title: data.title,
    description: `${data.title} 상세페이지입니다.`,
    robots: {
      index: true,
      follow: true,
    },
  };
};


const InfoItem = ({title, content} : {title : string, content : string}) => {
    return  <div className=" border-b border-gray-300 flex py-4">
    <h2 className="w-[20%]">{title}</h2>
    <p className="text-gray-500">{content}</p>
  </div>
}

const Detail = async ({ params }: Props) => {
  const { id } = await params;
  const { data } = await getPortfolioData_(id);

  if (!data) return;

  return (
    <div>
      <div className="pt-30 pb-20 bg-gray-50">
        <div className="max-w-270 w-full shadow-2xl h-fit m-auto bg-white p-8 overflow-hidden">
          <h1 className="text-3xl font-bold mb-4">시공 사례</h1>
          <div className="border-t mb-8">
            <InfoItem title="제목" content={data.title}/>
            <InfoItem title="설명" content={data.description}/>
            <InfoItem title="시공 기간" content={`${formatDate(data.created_at)} ~ ${formatDate(data.completed_at)}`}/>
            <InfoItem title="분류" content={data.category}/>
          </div>
          <h2 className="text-2xl font-bold  mb-4">시공 사진</h2>
          <PortfolioDetailImageGrid images={data.portfolio_images} />
          <button
            type="button"
            className="border text-gray-500 border-gray-400 m-auto block cursor-pointer py-2 px-4"
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
