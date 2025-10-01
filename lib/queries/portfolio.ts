import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase/supabaseClient';

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
  async (page: number, pageSize: number) => {
    const from = ((+page || 1) - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data, count } = await supabase
      .from('portfolio')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    return { data, count };
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
