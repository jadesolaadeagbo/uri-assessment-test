import React, { useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material';
import { SentimentPoint } from '@/types/trend';

interface SentimentChartProps {
  data: SentimentPoint[];
}

const SentimentChart: React.FC<SentimentChartProps> = React.memo(({ data }) => {
  const theme = useTheme();
  

  const yRange = useMemo(() => {
    if (!data || data.length === 0) {
      return [-0.5, 0.5]; 
    }
    
    const sentiments = data.map(item => item.sentiment);
    const min = Math.min(...sentiments);
    const max = Math.max(...sentiments);
    const padding = 0.2;
    return [Math.min(-0.5, min - padding), Math.max(0.5, max + padding)];
  }, [data]);
  
  const { positiveData, negativeData } = useMemo(() => {
    if (!data || data.length === 0) {
      return { positiveData: [], negativeData: [] };
    }
    
    const positive = data.map(item => item.sentiment > 0 ? item.sentiment : null);
    const negative = data.map(item => item.sentiment < 0 ? item.sentiment : null);
    return { positiveData: positive, negativeData: negative };
  }, [data]);

  return (
    <>
    {(!data || data.length === 0) ? (
      <div>No data available</div>
    ) : (
      <LineChart
      height={300} 
      margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
      series={[
        {
          data: positiveData,
          area: true,
          showMark: false,
          curve: 'natural',
          color: theme.palette.success.main,
          valueFormatter: (value: number | null) => value ? value.toFixed(2) : '',
        },
        {
          data: negativeData,
          area: true,
          showMark: false,
          curve: 'natural',
          color: theme.palette.error.main,
          valueFormatter: (value: number | null) => value ? value.toFixed(2) : '',
        },
        {
          data: data.map(item => item.sentiment),
          showMark: true,
          curve: 'natural',
          color: theme.palette.primary.main,
          valueFormatter: (value: number | null) => value !== null ? value.toFixed(2) : '',
        }
      ]}
      xAxis={[{
        data: data.map(item => new Date(item.date)),
        scaleType: 'time',
        valueFormatter: (date: Date) => 
          date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      }]}
      yAxis={[{
        min: yRange[0],
        max: yRange[1],
        label: 'Sentiment Score',
      }]}
      tooltip={{ trigger: 'item' }}
      slotProps={{
        legend: { hidden: true },
      }}
    />
    )}
  </>

  );
});

SentimentChart.displayName = 'SentimentChart';

export default SentimentChart;