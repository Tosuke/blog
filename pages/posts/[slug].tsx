import React from 'react';
import { NextPage } from 'next';
import { default as ErrorPage } from 'next/error';
import { DefaultLayout } from '../../components/layouts/DefaultLayout';
import { PostEntry } from '../../lib/models';
import { postRepository } from '../../lib/repository';

const Page: NextPage<{ entry?: PostEntry; content?: string }> = ({ entry, content }) => {
  if (entry == null || content == null) return <ErrorPage statusCode={404} />;
  return <DefaultLayout />;
};

Page.getInitialProps = async ctx => {
  const { slug } = ctx.query;
  if (typeof slug !== 'string') throw new Error('invalid param');
  const [entry, content] = await Promise.all([postRepository.fetchEntry(slug), postRepository.fetchContent(slug)]);
  return {
    entry,
    content
  };
};

export default Page;
