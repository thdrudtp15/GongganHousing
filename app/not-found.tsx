import Link from 'next/link';
import Button from '@/compositions/Button';
import { AiOutlineFileUnknown } from "react-icons/ai";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col px-4 items-center justify-center">
        <AiOutlineFileUnknown fontSize={80} className="mb-4" />
      <h1 className="text-4xl font-bold mb-4">페이지를 찾을 수 없습니다.</h1>
      <p className="text-lg max-w-lg text-center mb-8">
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.<br/>
      아래 버튼을 눌러 홈으로 이동해주세요.</p>
      <Link href={'/'} >
        <Button>홈으로 이동</Button>
      </Link>
    </div>
  );
};

export default NotFound;