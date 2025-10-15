
import HeroCarousel from "@/components/carousel/HeroCarousel";
import dummyImage1 from '@/public/images/hero_1.jpg';
import dummyImage2 from '@/public/images/hero_2.jpg';
import dummyImage3 from '@/public/images/hero_3.jpg';

const images = [dummyImage1, dummyImage2, dummyImage3];


const Hero = () => {

  return (
    <section className="w-full mt-20 h-90 md:h-120 overflow-hidden relative shadow-lg mb-12">
      <HeroCarousel slides={images}/>
    </section>
  );
};

export default Hero;
