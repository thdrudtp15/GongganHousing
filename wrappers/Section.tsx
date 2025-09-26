import { ReactNode } from 'react';

const Section = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <section
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
      className={`max-w-270 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

Section.Content = Content;
