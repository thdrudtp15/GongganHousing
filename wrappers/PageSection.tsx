



const PageSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-30 pb-20 bg-gray-50 px-8">
    <div className="max-w-270 w-full shadow-2xl h-fit m-auto bg-white p-8">
        {children}
    </div>
  </div>
  );
};

export default PageSection;

const Header = ({children}: {children: React.ReactNode}) => {
  return (
    <h1 className="text-3xl font-bold mb-4">{children}</h1>
  );
};

PageSection.Header = Header;