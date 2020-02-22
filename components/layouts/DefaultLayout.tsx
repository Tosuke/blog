import React from 'react';
import NextLink from 'next/link';
import { Flex, Box, Text, useTheme } from '@chakra-ui/core';

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Flex minHeight="100vh" width="100%" flexDirection="column">
      <Box as="nav" backgroundColor="header.bg" color="header.fg">
        <Box maxWidth="screen-md" marginX="auto" paddingLeft={4} paddingY={4}>
          <NextLink href="/">
            <a>
              <Text as="h1" display="inline" fontWeight="bold" fontSize="xl">
                Tosuke's weblog
              </Text>
            </a>
          </NextLink>
        </Box>
      </Box>
      <Box as="main" flex={1} bg="background">
        <Box maxWidth="screen-md" marginX="auto" marginY={4}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
