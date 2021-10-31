import { LogIn } from '@meridio/ui';
import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';

export default function Index() {
  const [session] = useSession();

  const logIn = () => signIn('github');
  const logOut = () => signOut();

  return <LogIn logIn={logIn} logOut={logOut} session={session} />;
}
