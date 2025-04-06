'use client';

import React, { useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Card, CardContent, Button, Alert, Skeleton } from '@mui/material';
import useHashtagTrend from '@/hooks/useHashtagTrend';
import HashtagTrendCard from '@/components/HashtagTrendCard';

const HashtagInsightPage: React.FC = () => {
  const params = useParams() || {};
  // const router = useRouter();
  
  // Extract hashtag from params
  const hashtagParam = params?.hashtag ? (
    Array.isArray(params.hashtag) ? params.hashtag[0] : params.hashtag
  ) : '';
  
  // Ensure hashtag is a string and remove # if present
  const normalizedHashtag = useMemo(() => {
    if (!hashtagParam) return '';
    return hashtagParam.startsWith('#') ? hashtagParam.substring(1) : hashtagParam;
  }, [hashtagParam]);
  

  const { data, isLoading, error, refetch } = useHashtagTrend(normalizedHashtag);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (!hashtagParam) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4">Loading hashtag...</Typography>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hashtag Insights
        </Typography>
        
        {isLoading && (
          <Card sx={{ p: 2, mb: 2 }}>
            <CardContent>
              <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={300} />
            </CardContent>
          </Card>
        )}
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              <Button color="inherit" size="small" onClick={handleRetry}>
                Retry
              </Button>
            }
          >
            Failed to load sentiment data for {hashtagParam}
          </Alert>
        )}
        
        {!isLoading && !error && data && (
          <HashtagTrendCard data={data} />
        )}
      </Container>
    </>
  );
};

export default HashtagInsightPage;