import { Tables } from './supabase';

export type Portfolio = Tables<'portfolio'>;
export type PortfolioImages = Pick<Tables<'portfolio_images'>, 'id' | 'image'>;
