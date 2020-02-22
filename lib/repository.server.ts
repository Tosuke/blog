import unified from 'unified';
import markdown from 'remark-parse';
import { PostRepository } from './repository';
import { PostEntry, PostContent } from './models';
import { posts } from './posts';
import { highlight } from './markdown/highlight';
import { stripPosition } from './markdown/stripPosition';
import { Content } from './markdown/types';

export class ServerPostRepository implements PostRepository {
  async fetchEntries(): Promise<PostEntry[]> {
    return posts;
  }

  async fetchEntry(slug: string): Promise<PostEntry | undefined> {
    return posts.find(p => p.slug === slug);
  }

  async fetchContent(slug: string): Promise<PostContent | undefined> {
    const source = posts.find(p => p.slug === slug)?.source;
    if (source == null) return undefined;
    if (source.type === 'markdown') {
      const node = unified()
        .use(markdown, { footnotes: true })
        .parse(source.raw);
      return {
        type: 'markdown',
        node: highlight(stripPosition(node)) as Content
      };
    }
    return undefined;
  }
}
