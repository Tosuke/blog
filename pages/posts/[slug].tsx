import React from 'react';
import { NextPage } from 'next';
import { default as ErrorPage } from 'next/error';
import { PostPage } from '../../components/pages/PostPage';
import { PostEntry, PostContent } from '../../lib/models';
import { postRepository } from '../../lib/repository';

const Page: NextPage<{ entry?: PostEntry; content?: PostContent }> = ({ entry, content }) => {
  if (entry == null || content == null) return <ErrorPage statusCode={404} />;
  return <PostPage entry={entry} content={content} />;
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
