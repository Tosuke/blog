import { NextApiRequest, NextApiResponse } from 'next';
import { postRepository } from '../../../lib/repository';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    if (typeof slug !== 'string') throw new Error('invalid param');
    const source = await postRepository.fetchSource(slug);
    if (source == null) {
      res.status(404);
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    if (source.type === 'html') {
      res.send(source.raw);
      return;
    } else {
      res.status(404);
      return;
    }
  } catch (e) {
    res.status(500);
    res.setHeader('Content-Type', 'text/plain');
    res.send(e instanceof Error ? `${e.name}: ${e.message}` : 'Internal Server Error');
  } finally {
    res.end();
  }
};
