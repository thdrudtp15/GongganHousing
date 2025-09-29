import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';

import { supabase } from '@/lib/supabase/supabaseClient';

import PageBanner from '@/containers/PageBanner';

import dummy from '@/public/images/banner_inquiry.webp';

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

const getPorfolioImages = unstable_cache(
  async (id: string) => {
    return await supabase
      .from('portfolio_images')
      .select('image')
      .eq('parent_id', id);
  },
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
  const { data: imageData } =
    await getPorfolioImages(id);

  console.log(data);
  console.log(imageData);

  return (
    <div>
      <PageBanner image={dummy}>
        시공사례
      </PageBanner>
    </div>
  );
};

export default Detail;
