import { ReactNode } from 'react';

const ContentWrap = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={`py-[100px] ${className}`}>{children}</div>;
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
        mx-auto px-[40px] ${className}
        max-w-[1200px]
      
      `}
    >
      {children}
    </div>
  );
};

ContentWrap.Content = Content;
