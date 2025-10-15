'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleQueryParams = ({ queryObj, scroll = false }: { queryObj: Record<string, string | number>, scroll?: boolean }) => {
    const params = new URLSearchParams(searchParams?.toString() || '');

    Object.entries(queryObj).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value.toString());
    });
    router.push(`${pathname}?${params.toString()}`, { scroll });
  };

  return {
    handleQueryParams,
  };
};

export default useQueryParams;
