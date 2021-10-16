import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@meridio/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider as NextAuthProvider } from 'next-auth/client';
import PropTypes from 'prop-types';
import React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <NextAuthProvider session={pageProps.session}>
      <React.Fragment>
        <Head>
          <title>NX Boilerplate</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </React.Fragment>
    </NextAuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
