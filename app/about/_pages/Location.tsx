import Map from '@/components/Map';
import Section from '@/wrappers/Section';

const Location = () => {
  return (
    <Section>
      <Section.Content>
        <div className="w-full h-40">
          <Map />
        </div>
      </Section.Content>
    </Section>
  );
};

export default Location;
