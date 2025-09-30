import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase/supabaseClient';

export const getPortfolioData = unstable_cache(
  async (id: string) => {
    return await supabase.from('portfolio').select('*').eq('id', id).single();
  },
  ['portfolio-detail'],
  { revalidate: 10000 },
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
  { revalidate: 10000 },
);
