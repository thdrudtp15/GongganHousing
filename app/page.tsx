import Hero from '@/containers/main/Hero';
import Inquiry from '@/containers/main/Inquiry';
import Projects from '@/containers/main/Projects';
import Services from '@/containers/main/Serivces';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Inquiry />
    </main>
  );
};

export default Home;
