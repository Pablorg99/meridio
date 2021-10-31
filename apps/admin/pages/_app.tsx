import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider as SessionProvider } from 'next-auth/client';
import React from 'react';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Meridio Admin</title>
        <link rel="shortcut icon" href="https://i.ibb.co/1bLY5Ht/logo.png" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default App;
