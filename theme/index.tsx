import React from 'react';
import { Global } from '@emotion/core';
import { theme as baseTheme } from '@chakra-ui/core';

export const theme = {
  ...baseTheme,
  sizes: {
    ...baseTheme.sizes,
    'screen-sm': (baseTheme.breakpoints as any).sm,
    'screen-md': (baseTheme.breakpoints as any).md,
    'screen-lg': (baseTheme.breakpoints as any).lg,
    'screen-xl': (baseTheme.breakpoints as any).xl
  } as any,
  colors: {
    ...baseTheme.colors,
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    background: 'var(--color-background)',
    header: {
      bg: 'var(--color-header-bg)',
      fg: 'var(--color-header-fg)'
    },
    card: 'var(--color-card)',
    heading: 'var(--color-heading)',
    text: 'var(--color-text)',
    border: 'var(--color-border)'
  }
};

const variables: Record<string, [string, string]> = {
  '--color-primary': [theme.colors.blue[500], theme.colors.blue[400]],
  '--color-secondary': [theme.colors.purple[500], theme.colors.purple[400]],
  '--color-background': [theme.colors.gray[200], theme.colors.black],
  '--color-header-bg': [theme.colors.black, theme.colors.gray[800]],
  '--color-header-fg': [theme.colors.white, theme.colors.white],
  '--color-card': [theme.colors.white, theme.colors.gray[800]],
  '--color-heading': [theme.colors.gray[700], theme.colors.white],
  '--color-text': [theme.colors.gray[600], theme.colors.gray[300]],
  '--color-border': [theme.colors.gray[500], theme.colors.gray[400]]
};

export const GlobalStyle = () => (
  <Global
    styles={{
      ':root': Object.fromEntries(Object.entries(variables).map(([k, [light]]) => [k, light])),
      '@media(prefers-color-scheme: dark)': {
        ':root': Object.fromEntries(Object.entries(variables).map(([k, [, dark]]) => [k, dark]))
      },
      body: {
        backgroundColor: theme.colors.background
      }
    }}
  />
);
