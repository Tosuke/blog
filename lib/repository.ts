import { PostEntry, PostContent } from './models';
import ky from 'ky-universal';
import { posts } from './posts';

export interface PostRepository {
  fetchEntries(): Promise<PostEntry[]>;
  fetchEntry(slug: string): Promise<PostEntry | undefined>;
  fetchContent(slug: string): Promise<PostContent | undefined>;
}

class ClientPostRepository implements PostRepository {
  async fetchEntries(): Promise<PostEntry[]> {
    return posts;
  }

  async fetchEntry(slug: string): Promise<PostEntry | undefined> {
    return posts.find(p => p.slug === slug);
  }

  async fetchContent(slug: string): Promise<PostContent | undefined> {
    try {
      return await ky.get(`/api/posts/${slug}`).json();
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
}

class PostRepositoryProxy implements PostRepository {
  private repo: Promise<PostRepository>;

  constructor() {
    if (process.browser) {
      this.repo = Promise.resolve(new ClientPostRepository());
    } else {
      this.repo = import('./repository.server').then(m => new m.ServerPostRepository());
    }
  }

  async fetchEntries() {
    return (await this.repo).fetchEntries();
  }

  async fetchEntry(slug: string) {
    return (await this.repo).fetchEntry(slug);
  }

  async fetchContent(slug: string) {
    return (await this.repo).fetchContent(slug);
  }
}

export const postRepository: PostRepository = new PostRepositoryProxy();
