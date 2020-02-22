import React from 'react';
import NextLink from 'next/link';
import { Flex, Text, Image, PseudoBox } from '@chakra-ui/core';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Card } from '../designs/Card';
import { PostEntry } from '../../lib/models';

const PostEntryItem: React.FC<PostEntry> = ({ slug, title, description, image }) => (
  <Flex as="article" w="full" flexDirection="column">
    <Text as="h4" color="heading">
      2020-2-13
    </Text>
    <Text as="h1" fontSize="xl" fontWeight="bold" color="heading">
      {title}
    </Text>
    <Flex marginTop={2} flexDirection={{ base: 'column', md: 'row' }}>
      {image && (
        <Image
          src={image}
          objectFit="cover"
          objectPosition="center"
          w={{ base: 'full', md: 32 }}
          h={32}
          rounded="md"
          roundedRight={{ md: 0 }}
        />
      )}
      <Text color="text" mt={{ base: image ? 2 : 0, md: 0 }} ml={{ md: image ? 2 : 0 }}>
        {description}
      </Text>
    </Flex>
  </Flex>
);

export const EntriesPage: React.FC<{ entries: readonly PostEntry[] }> = ({ entries }) => (
  <DefaultLayout>
    <Card px={2}>
      {entries.map(entry => (
        <PseudoBox key={entry.slug} px={2} py={4} borderColor="border" _notFirst={{ borderTopWidth: 1 }}>
          <NextLink href="/posts/[slug]" as={`/posts/${entry.slug}`}>
            <a>
              <PostEntryItem {...entry} />
            </a>
          </NextLink>
        </PseudoBox>
      ))}
    </Card>
  </DefaultLayout>
);
