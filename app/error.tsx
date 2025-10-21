'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { BiError } from 'react-icons/bi';

const ErrorPage = ({ error }: { error: Error }) => {
  console.log(error, 'Error log');

  return (
    <div className="h-screen flex flex-col px-4 items-center justify-center">
      <BiError fontSize={80} className="mb-4 text-red-500" />
      <h1 className="text-4xl font-bold mb-4">오류가 발생했습니다.</h1>
      <p className="text-lg max-w-lg text-center mb-8">
        일시적인 오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </p>
      <Link href={'/'}>
        <Button>홈으로 이동</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
