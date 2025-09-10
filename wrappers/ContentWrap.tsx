const ContentWrap = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
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

export default ContentWrap;
