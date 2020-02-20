import React from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Flex, Text, Image, PseudoBox } from '@chakra-ui/core';
import { DefaultLayout } from '../components/layouts/DefaultLayout';
import { PostEntry } from '../lib/models';
import { postRepository } from '../lib/repository';

const PostEntryItem: React.FC<PostEntry> = ({ slug, title, description, image }) => (
  <Flex as="article" w="full" flexDirection="column">
    <Text as="h4" color="white">
      2020-2-13
    </Text>
    <Text as="h1" fontSize="xl" fontWeight="bold" color="white">
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
      <Text color="gray.300" mt={{ base: image ? 2 : 0, md: 0 }} ml={{ md: image ? 2 : 0 }}>
        {description}
      </Text>
    </Flex>
  </Flex>
);

const Page: NextPage<{ entries: readonly PostEntry[] }> = ({ entries }) => (
  <DefaultLayout>
    <Box bg="gray.700" rounded="md" px={4}>
      {entries.map(entry => (
        <PseudoBox key={entry.slug} p={4} borderColor="gray.500" _notFirst={{ borderTopWidth: 1 }}>
          <NextLink href="/posts/[slug]" as={`/posts/${entry.slug}`}>
            <a>
              <PostEntryItem {...entry} />
            </a>
          </NextLink>
        </PseudoBox>
      ))}
    </Box>
  </DefaultLayout>
);

Page.getInitialProps = async () => {
  return {
    entries: await postRepository.fetchEntries()
  };
};

export default Page;
