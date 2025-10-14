import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Auth from '@/components/Auth';

const Page = async () => {

  const session = await getServerSession(authOptions);
   
    return <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
        <h1 className="text-3xl font-bold mb-6">관리자 로그인</h1>
        <Auth session={session} />        
    </div>
}

export default Page;