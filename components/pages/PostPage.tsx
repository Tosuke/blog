import React from 'react';
import { Text, Box } from '@chakra-ui/core';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Card } from '../designs/Card';
import { Markdown } from '../modules/Markdown';
import { PostEntry, PostContent } from '../../lib/models';

export const PostPage: React.FC<{ entry: PostEntry; content: PostContent }> = ({ entry, content }) => {
  return (
    <DefaultLayout>
      <Card py={4} px={4}>
        <Text as="h4" fontSize="md" color="heading">
          2020-2-22
        </Text>
        <Text as="h1" fontSize="3xl" fontWeight="bold" color="heading">
          {entry.title}
        </Text>
        <Box mt={4}>
          <Markdown node={content.node} />
        </Box>
      </Card>
    </DefaultLayout>
  );
};
