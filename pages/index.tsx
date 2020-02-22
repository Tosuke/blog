import React from 'react';
import { NextPage } from 'next';
import { EntriesPage } from '../components/pages/EntriesPage';
import { PostEntry } from '../lib/models';
import { postRepository } from '../lib/repository';

const Page: NextPage<{ entries: readonly PostEntry[] }> = ({ entries }) => <EntriesPage entries={entries} />;

Page.getInitialProps = async () => {
  return {
    entries: await postRepository.fetchEntries()
  };
};

export default Page;
