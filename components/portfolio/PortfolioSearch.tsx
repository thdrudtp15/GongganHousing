'use client';
import { Input } from '@/components/ui/Input';

import { services } from '@/constants/services';

import useQueryParams from '@/hooks/useQueryParams';

const PortfolioSearch = ({
  search,
  category,
  count,
}: {
  search: string;
  category: string;
  count: number;
}) => {
  const { handleQueryParams } = useQueryParams();

  const handleSearch = (search: string) => {
    handleQueryParams({ queryObj: { page: 1, search } });
  };

  const handleCategory = (category: string) => {
    handleQueryParams({ queryObj: { page: 1, category: category === '전체' ? '' : category } });
  };

  return (
    <div className="">
      <div className="border border-gray-300 mb-4 py-4 flex justify-center gap-2">
        {[undefined, ...services].map((service, index) => (
          <span
            key={index}
            className={`cursor-pointer ${
              category === service ? 'border-b-2 font-bold text-(--identity)' : ''
            }`}
            onClick={() => handleCategory(service || '전체')}
          >
            {service === undefined ? '전체' : service}
          </span>
        ))}
      </div>
      <div className="py-6 px-4 bg-gray-100 md:flex justify-between items-center">
        <p className="text-base">
          총 <span className="font-bold">{count}</span>개의 게시글이 있습니다.
        </p>
        <Input
          type="text"
          labelClassName="md:w-[50%]"
          placeholder="제목으로 검색"
          defaultValue={search}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const { value } = e.target as HTMLInputElement;
              handleSearch(value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default PortfolioSearch;
