import { Dayjs } from 'dayjs';
import { Node as MarkdownNode, Content } from './markdown/types';

type ImageSourceItem = Readonly<{
  src: string;
  type: string;
}>;

export type ImageSource = readonly [ImageSourceItem, ...ImageSourceItem[]];

export type PostEntry = {
  slug: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  title: string;
  description: string;
  image?: string;
  tags: string[];
};

export type PostSource = {
  type: 'markdown';
  raw: string;
};

export type PostContent = {
  type: 'markdown';
  node: Content;
};

export type PostDoc = PostEntry & {
  source: PostSource;
};
