import React from 'react';
import { Box } from '@chakra-ui/core';

export const Card: React.FC<React.ComponentProps<typeof Box>> = props => (
  <Box bg="card" rounded={{ _: 'none', md: 'md' }} px={4} {...props} />
);
