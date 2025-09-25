import { ReactNode } from 'react';

const ContentWrap = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`max-w-[1200px] mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentWrap;

const Content = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={` 
        mx-auto px-[2rem] max-w-[1200px]
      `}
    >
      {children}
    </div>
  );
};

ContentWrap.Content = Content;
