import React from 'react';
import { AppProps } from 'next/app';
import { Theme } from 'styled-system';
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core';

const sizes: Theme['sizes'] = {
  'screen-sm': (theme.breakpoints as string[])[0],
  'screen-md': (theme.breakpoints as string[])[1],
  'screen-lg': (theme.breakpoints as string[])[2],
  'screen-xl': (theme.breakpoints as string[])[3]
};

const customTheme: any = {
  ...theme,
  sizes: {
    ...theme.sizes,
    ...sizes
  }
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
