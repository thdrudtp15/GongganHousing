import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';

import { supabase } from '@/lib/supabase/supabaseClient';

const getPortfolioData = unstable_cache(
  async (id: string) => {
    return await supabase
      .from('portfolio')
      .select('*')
      .eq('id', id)
      .single();
  },
  ['portfolio-detail'],
  { revalidate: false },
);

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const { data } = await getPortfolioData(id);

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

const Detail = async ({ params }: Props) => {
  const { id } = await params;
  const { data } = await getPortfolioData(id);

  console.log(data);

  return <div>{id}</div>;
};

export default Detail;
