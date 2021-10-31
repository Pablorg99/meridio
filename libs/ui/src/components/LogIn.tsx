import { Button, Container, Heading, Image } from '@chakra-ui/react';
import { Nullable } from '@meridio/domain';
import { Session } from 'next-auth';
import React from 'react';

type Props = {
  session?: Nullable<Session>;
  logIn(): void;
  logOut(): void;
};

export const LogIn: React.FunctionComponent<Props> = ({ session, logIn, logOut }) => (
  <Container
    maxWidth={'400px'}
    marginTop={'100px'}
    display={'flex'}
    flexDirection={'column'}
    alignItems={'center'}
    textAlign={'center'}
  >
    <Image boxSize={'200px'} alt={'Logo de Meridio'} src={'https://i.ibb.co/1bLY5Ht/logo.png'} />
    <Heading marginTop={'20px'} fontSize={'6xl'}>
      Meridio
    </Heading>
    {session ? (
      <Button marginTop={'30px'} colorScheme={'orange'} variant={'solid'} onClick={logOut}>
        Cerrar sesión
      </Button>
    ) : (
      <Button marginTop={'30px'} colorScheme={'orange'} variant={'solid'} onClick={logIn} data-testid={'login'}>
        Iniciar sesión con GitHub
      </Button>
    )}
  </Container>
);
