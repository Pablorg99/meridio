import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export const theme = extendTheme(
  {
    fonts: {
      heading: 'Montserrat',
      body: 'Lato',
    },
  },
  withDefaultColorScheme({
    colorScheme: 'orange',
    components: ['Button', 'Switch'],
  })
);
