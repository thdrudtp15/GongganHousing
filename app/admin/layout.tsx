import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';


const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

    if(!session) {
       redirect('/api/auth/signin');
    }

  return <div>{children}</div>;
};

export default Layout;
