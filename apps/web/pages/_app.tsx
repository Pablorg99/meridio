import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Provider as SessionProvider } from 'next-auth/client';
import React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
