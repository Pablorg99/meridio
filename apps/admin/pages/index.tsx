import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import React, { useEffect } from 'react';

import { AppBar } from '../components/AppBar';

export default function Index() {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/login');
    } else {
      router.push('/conferences');
    }
  }, [loading, session, router]);

  return null;
}
