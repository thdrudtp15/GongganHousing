'use client';

import { services } from '@/constants/services';

import useQueryParams from '@/lib/utils/useQueryParams';

import type { ChangeEvent } from 'react';

const PortfolioSearch = ({ search, category }: { search: string; category: string }) => {
  const { handleQueryParams } = useQueryParams();

  const handleSearch = (search: string) => {
    handleQueryParams({ queryObj: { page: 1, search } });
  };

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    handleQueryParams({ queryObj: { page: 1, category: value === '전체' ? '' : value } });
  };

  return (
    <div className="flex w-full">
      <input
        type="text"
        className="flex-1 border border-gray-300 p-2 "
        placeholder="제목으로 검색"
        defaultValue={search}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const { value } = e.target as HTMLInputElement;
            handleSearch(value);
          }
        }}
      />
      <select
        value={category}
        className="border border-l-0 border-gray-300"
        onChange={(e) => {
          handleCategory(e);
        }}
      >
        {['전체', ...services].map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PortfolioSearch;
