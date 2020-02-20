import { Dayjs } from 'dayjs';

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
  type: 'html' | 'markdown';
  raw: string;
};

export type PostContent = {
  type: 'markdown';
};

export type PostDoc = PostEntry & {
  source: PostSource;
};
