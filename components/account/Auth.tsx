'use client';
import { signIn, signOut } from 'next-auth/react';
import Button from '@/components/ui/Button';

const Login = () => {
  return <Button className='bg-blue-500' onClick={() => signIn('google',{callbackUrl : '/'})}>관리자 로그인</Button>;
};

const Logout = () => {
  return <Button className='bg-red-500' onClick={() => signOut({callbackUrl : '/'})}>로그아웃</Button>;
};

const Auth = ({ session }: { session: any }) => {
  return (
    <div className="flex gap-[20px]">
      {!session && <Login />}
      {session && <Logout />}
    </div>
  );
};

export default Auth;
