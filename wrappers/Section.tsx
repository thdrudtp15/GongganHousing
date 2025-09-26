import { ReactNode } from 'react';

const Section = ({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) => {
  return (
    <section
      id={id}
      className={`py-28 px-8 ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;

const Content = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`max-w-360 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

Section.Content = Content;
