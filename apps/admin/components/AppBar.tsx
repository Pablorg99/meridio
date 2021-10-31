import { Button, Flex, Heading, Image } from '@chakra-ui/react';
import { Nullable } from '@meridio/domain';
import { useRouter } from 'next/dist/client/router';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/client';
import React from 'react';

type Props = {
  session?: Nullable<Session>;
};

export const AppBar: React.FunctionComponent<Props> = ({ session, children }) => {
  const router = useRouter();

  const navigateToConferencesPage = () => router.push('/conferences');
  const logIn = () => signIn('github', { callbackUrl: '/' });
  const logOut = () => signOut({ callbackUrl: '/login' });

  return (
    <>
      <Flex justifyContent="space-between" padding={'15px'} backgroundColor={'#DD6B20'} textColor={'white'}>
        <Flex alignItems={'center'} onClick={navigateToConferencesPage} cursor={'pointer'}>
          <Image boxSize={'40px'} src={'https://i.ibb.co/qCpV1Mh/logo-svg.png'} />
          <Heading marginLeft={'10px'} marginBottom={'1px'}>
            Meridio
          </Heading>
        </Flex>
        {session ? (
          <Button
            colorScheme={'white'}
            variant="outline"
            _hover={{ bg: '#EBEBEB80' }}
            onClick={logOut}
            data-testid={'logout'}
          >
            Cerrar sesión
          </Button>
        ) : (
          <Button colorScheme={'white'} variant="outline" onClick={logIn} _hover={{ bg: '#EBEBEB80' }}>
            Iniciar sesión
          </Button>
        )}
      </Flex>
      <main>{children}</main>;
    </>
  );
};
