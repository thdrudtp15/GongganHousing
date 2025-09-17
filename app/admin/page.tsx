import Tiptap from '@/components/editor/Editor';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

const Page = async () => {
  const session = await getServerSession(authOptions);

  console.log(session, '어드민');

  return (
    <div>
      관리자 페이지입니다.
      <Tiptap />
    </div>
  );
};

export default Page;
