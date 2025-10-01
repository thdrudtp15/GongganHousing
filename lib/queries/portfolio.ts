import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase/supabaseClient';

import { services } from '@/constants/services';

export const getPortfolioData = unstable_cache(
  async (id: string) => {
    return await supabase.from('portfolio').select('*').eq('id', id).single();
  },
  ['portfolio-detail'],
  { revalidate: 10000, tags: ['portfolio-detail'] },
);

export const getPorfolioImages = unstable_cache(
  async (id: string) => {
    return await supabase
      .from('portfolio_images')
      .select('id, image')
      .eq('parent_id', id)
      .order('id', { ascending: true });
  },
  ['portfolio-images'],
  { revalidate: 10000, tags: ['portfolio-images'] },
);

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

// export const getPortfolioData_ = unstable_cache(
//   async (id: string) => {
//     return await supabase
//       .from('portfolio')
//       .select(
//         `
//         id,
//         title,
//         description,
//         portfolio_images (
//           id,
//           image
//         )
//       `,
//       )
//       .eq('id', id)
//       .single();
//   },
//   ['portfolio-detail'],
//   { revalidate: 10000, tags: ['portfolio'] },
// );
