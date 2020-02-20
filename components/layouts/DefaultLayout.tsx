import React from 'react';
import NextLink from 'next/link';
import { Flex, Box, Text } from '@chakra-ui/core';

export const DefaultLayout: React.FC = ({ children }) => (
  <Flex minHeight="100vh" width="100%" flexDirection="column">
    <Box as="nav" backgroundColor="gray.700">
      <Box maxWidth="screen-md" marginX="auto" paddingLeft={8} paddingY={4}>
        <NextLink href="/">
          <a>
            <Text as="h1" display="inline" fontWeight="bold" fontSize="xl" color="white">
              Tosuke's weblog
            </Text>
          </a>
        </NextLink>
      </Box>
    </Box>
    <Box as="main" flex={1} bg="black">
      <Box maxWidth="screen-md" marginX="auto" marginY={4}>
        {children}
      </Box>
    </Box>
  </Flex>
);
