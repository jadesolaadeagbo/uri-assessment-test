import React from 'react';
import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';
import { SentimentPoint } from '@/types/trend';
// Dynamically import the chart component with SSR disabled
const SentimentChart = dynamic(
  () => import('./SentimentChart'),
  { 
    ssr: false,
    loading: () => (
      <Box 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        <CircularProgress />
      </Box>
    )
  }
);

interface LazyLoadedSentimentChartProps {
  data: SentimentPoint[];
}

const LazyLoadedSentimentChart: React.FC<LazyLoadedSentimentChartProps> = ({ data }) => {
  return <SentimentChart data={data} />;
};

export default LazyLoadedSentimentChart;