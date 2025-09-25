import Hero from '@/containers/main/Hero';
import Services from '@/containers/main/Services';
import ContactUs from '@/containers/main/ContactUs';

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Services />
      <ContactUs />
    </main>
  );
};

export default Home;
