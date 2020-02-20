import { PostEntry, PostSource, PostDoc } from './models';
import dayjs from 'dayjs';
import { http } from './http';

const posts: PostDoc[] = [
  {
    slug: 'post1',
    createdAt: dayjs('2020-02-17'),
    updatedAt: dayjs('2020-02-17'),
    tags: [],
    title: 'ラジオネーム“おもしろくん”さんからのお便り',
    description: '大好きな人の隣の席にいるのに、話が噛み合いません。どうすればいいですか？',
    image: 'https://github.com/Tosuke.png',
    source: {
      type: 'html',
      raw: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
    }
  },
  {
    slug: 'post2',
    createdAt: dayjs('2019-12-31'),
    updatedAt: dayjs('2020-01-01'),
    tags: [],
    title: 'Test',
    description: 'んー、べつにいいんじゃないですかね？',
    source: {
      type: 'html',
      raw: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
    }
  }
];

class PostRepository {
  async fetchEntries(): Promise<PostEntry[]> {
    return posts;
  }

  async fetchEntry(slug: string): Promise<PostEntry | undefined> {
    return posts.find(p => p.slug === slug);
  }

  async fetchSource(slug: string): Promise<PostSource | undefined> {
    return posts.find(p => p.slug === slug)?.source;
  }

  async fetchContent(slug: string): Promise<string | undefined> {
    try {
      return await http.get(`api/posts/${slug}`).text();
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
}

export const postRepository = new PostRepository();
