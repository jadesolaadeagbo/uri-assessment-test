import { useState, useEffect, useCallback } from 'react';
import { HashtagTrendData } from '@/types/trend';

const useHashtagTrend = (hashtag: string) => {
  const [data, setData] = useState<HashtagTrendData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!hashtag) return;
    
    setIsLoading(true);
    setError(null);
     
    try {
      const response = await fetch(`/api/trends/${hashtag}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [hashtag]);

  // Fetch data when hashtag changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch };
};

export default useHashtagTrend;