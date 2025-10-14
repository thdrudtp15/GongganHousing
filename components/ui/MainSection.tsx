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
    <section id={id} className={`pb-12 px-4 sm:px-8 ${className}`}>
      {children}
    </section>
  );
};

export default Section;

const Content = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`max-w-270 mx-auto border-t border-gray-200 py-4 ${className}`}>{children}</div>
  );
};

Section.Content = Content;
