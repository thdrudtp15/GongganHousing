import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase/supabaseClient';

export const getPortfolioList = unstable_cache(
  async ({
    page,
    pageSize,
    category,
    search,
  }: {
    page: number;
    pageSize: number;
    search?: string;
    category?: string;
  }) => {
    console.log('디테일 가져오기');
    const from = ((+page || 1) - 1) * pageSize;
    const to = from + pageSize - 1;
    let query = supabase
      .from('portfolio')
      .select('*', { count: 'exact' })
      .ilike('title', `%${search || ''}%`)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (category) {
      query = query.eq('category', category);
    }
    return query;
  },
  [`portfolio-page`],
  { revalidate: false, tags: ['portfolio-list'] },
);

export const getPortfolioData_ = unstable_cache(
  async (id: string) => {
    console.log('리스트 가져오기 실행');
    return await supabase
      .from('portfolio')
      .select(
        `
        id,
        title,
        created_at,
        started_at,
        completed_at,
        category,
        description,
        portfolio_images (
          id,
          image
        )
      `,
      )
      .eq('id', id)
      .single();
  },
  ['portfolio-detail'],
  { revalidate: 10000, tags: ['portfolio'] },
);
