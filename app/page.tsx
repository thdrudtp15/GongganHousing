import Hero from '@/containers/main/Hero';
import Services from '@/containers/main/Services';
import Portfolio from '@/containers/main/Portfolio';
import Inquiry from '@/containers/main/Inquiry';

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
