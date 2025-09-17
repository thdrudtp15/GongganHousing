'use client';
import { signIn, signOut } from 'next-auth/react';

const Login = () => {
  return <button onClick={() => signIn()}>관리자 로그인</button>;
};

const Logout = () => {
  return <button onClick={() => signOut()}>로그아웃</button>;
};

const Auth = () => {
  return (
    <div className="flex gap-[20px]">
      <Login />
      <Logout />
    </div>
  );
};

export default Auth;
