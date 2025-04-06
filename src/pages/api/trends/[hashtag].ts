import type { NextApiRequest, NextApiResponse } from 'next';
import { HashtagTrendData } from '@/types/trend';
import { trendData } from '@/mocks/trendData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HashtagTrendData | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { hashtag } = req.query;
  
  if (!hashtag || typeof hashtag !== 'string') {
    return res.status(400).json({ error: 'Hashtag is required' });
  }

  const normalizedHashtag = hashtag.toLowerCase();
  

  const data: HashtagTrendData = {
    ...trendData,
    hashtag: `#${normalizedHashtag}`
  };

  setTimeout(() => {
    res.status(200).json(data);
  }, 800);
}