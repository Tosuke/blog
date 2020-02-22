import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { theme, GlobalStyle } from '../theme';
import '../css/highlight.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <GlobalStyle />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
