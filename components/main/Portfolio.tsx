import PortfolioCarousel from "@/components/carousel/PortfolioCarousel";
import Section from '@/components/ui/MainSection';
import Link from 'next/link';
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { Portfolio } from "@/types/portfolio";


const Portfolio = async () => {

  const {data} = await supabase.from('portfolio').select('*').order('created_at', { ascending: false }).limit(6);


  return (
    <Section>
      <Section.Content className="overflow-hidden">
        <h2 className="text-5xl font-bold" id="사업영역">
          시공 사례
        </h2>
        <div className="flex justify-between mb-8">
          <p className="text-lg text-gray-500">PORTFOLIO</p>
          <Link href="/portfolio">
            <Button type="button" className="text-sm">
              더 보기
            </Button>
          </Link>
        </div>
        <PortfolioCarousel slides={data as Portfolio[]}/>
      </Section.Content>
    </Section>
  );
};

export default Portfolio;
