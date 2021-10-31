import { LogIn as LogInComponent } from '@meridio/ui';
import { signIn, signOut, useSession } from 'next-auth/client';

import { AppBar } from '../components/AppBar';

export default function LogIn() {
  const [session] = useSession();

  const gitHubLogIn = () => signIn('github', { callbackUrl: '/conferences' });
  const logOut = () => signOut();

  return (
    <AppBar session={session}>
      <LogInComponent session={session} logIn={gitHubLogIn} logOut={logOut} />;
    </AppBar>
  );
}
