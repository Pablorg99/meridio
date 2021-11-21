import '@fontsource/montserrat/700.css';
import '@fontsource/lato/400.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Provider as SessionProvider } from 'next-auth/client';
import React from 'react';

import { theme } from './theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
