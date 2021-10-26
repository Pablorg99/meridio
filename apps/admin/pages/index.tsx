import Button from '@material-ui/core/Button';
import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';

export default function Index() {
  const [session, loading] = useSession();
  return session ? (
    <Button onClick={() => signOut()} color="primary" data-testid="logout">
      LOGOUT
    </Button>
  ) : (
    <Button onClick={() => signIn()} color="primary">
      LOGIN
    </Button>
  );
}
