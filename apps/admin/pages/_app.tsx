import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to admin!</title>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default App;
