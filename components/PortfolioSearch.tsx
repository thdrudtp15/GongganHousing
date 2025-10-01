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
    handleQueryParams({ queryObj: { page: 1, category: e.target.value } });
  };

  return (
    <div className="flex w-full">
      <input
        type="text"
        className="flex-1"
        placeholder="제목으로 검색"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const { value } = e.target as HTMLInputElement;
            handleSearch(value);
          }
        }}
      />
      <select
        value={category || services?.[0]}
        onChange={(e) => {
          handleCategory(e);
        }}
      >
        {services.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PortfolioSearch;
