import { NextApiRequest, NextApiResponse } from 'next';
import { postRepository } from '../../../lib/repository';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    if (typeof slug !== 'string') throw new Error('invalid param');
    const content = await postRepository.fetchContent(slug);
    if (content == null) {
      res.status(404).json({
        error: 'not found'
      });
      return;
    }
    res.json(content);
  } catch (e) {
    res.status(500);
    res.json({
      error: e instanceof Error ? `${e.name}: ${e.message}` : 'Internal Server Error'
    });
  } finally {
    res.end();
  }
};
