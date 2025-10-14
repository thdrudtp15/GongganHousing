import Hero from '@/components/main/Hero';
import Services from '@/components/main/Services';
import Portfolio from '@/components/main/Portfolio';
import Inquiry from '@/components/main/Inquiry';

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Services />
      <Portfolio />
      <Inquiry />
    </main>
  );
};

export default Home;
