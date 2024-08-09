'use client';

import LandingPage from './landing/page';
import ChatPage from './chat/page';
import SignInPage from './login/page';
import SignUpPage from './signup/page';
import { usePathname } from 'next/navigation';

const Page = () => {
  const pathname = usePathname();

  if (pathname === '/login') {
    return <SignInPage />;
  }

  if (pathname === '/signup') {
    return <SignUpPage />;
  }

  if (pathname === '/chat') {
    return <ChatPage />;
  }

  return <LandingPage />;
};

export default Page;
