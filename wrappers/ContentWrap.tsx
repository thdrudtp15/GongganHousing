const ContentWrap = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`max-w-[1200px] mx-auto px-[20px] ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentWrap;
