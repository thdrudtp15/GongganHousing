import Hero from '@/containers/main/Hero';
import Services from '@/containers/main/Services';
import ContactUs from '@/containers/main/ContactUs';
import Portfolio from '@/containers/main/Portfolio';

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Services />
      <Portfolio />
      <ContactUs />
    </main>
  );
};

export default Home;
