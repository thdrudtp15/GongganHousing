'use client';
import {Input} from '@/compositions/Input';
import Select from '@/compositions/Select';


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
      <Input
        type="text"
        className="flex-1"
        placeholder="제목으로 검색"
        defaultValue={search}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const { value } = e.target as HTMLInputElement;
            handleSearch(value);
          }
        }}
      />
      <Select
        value={category}
        className="border-l-0"
        onChange={(e) => {
          handleCategory(e);
        }}
        options={['전체', ...services]}
      />
    </div>
  );
};

export default PortfolioSearch;
