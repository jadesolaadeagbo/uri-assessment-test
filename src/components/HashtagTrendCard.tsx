import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import SentimentChart from './SentimentChart';
import { HashtagTrendData } from '@/types/trend';

interface HashtagTrendCardProps {
  data: HashtagTrendData;
}

const HashtagTrendCard: React.FC<HashtagTrendCardProps> = React.memo(({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  

  const trendDirection = useMemo(() => {
    if (!data.trend || data.trend.length < 2) return 'flat';
    
    const first = data.trend[0].sentiment;
    const last = data.trend[data.trend.length - 1].sentiment;
    
    if (last > first) return 'up';
    if (last < first) return 'down';
    return 'flat';
  }, [data.trend]);
  
  // Determine trend color and icon
  const { trendColor, TrendIcon } = useMemo(() => {
    switch (trendDirection) {
      case 'up':
        return { 
          trendColor: theme.palette.success.main, 
          TrendIcon: TrendingUpIcon 
        };
      case 'down':
        return { 
          trendColor: theme.palette.error.main, 
          TrendIcon: TrendingDownIcon 
        };
      default:
        return { 
          trendColor: theme.palette.info.main, 
          TrendIcon: TrendingFlatIcon 
        };
    }
  }, [trendDirection, theme.palette]);

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant={isMobile ? "h5" : "h4"} component="h2" sx={{ fontWeight: 500 }}>
              {data.hashtag}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data.range}
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: `${trendColor}15`, 
              color: trendColor,
              borderRadius: 1,
              px: 2,
              py: 0.5,
            }}
          >
            <TrendIcon sx={{ mr: 0.5 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {trendDirection === 'up' ? 'Positive Trend' : 
               trendDirection === 'down' ? 'Negative Trend' : 'Neutral Trend'}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ height: isMobile ? 250 : 350 }}>
          <SentimentChart data={data.trend} />
        </Box>
      </CardContent>
    </Card>
  );
});

HashtagTrendCard.displayName = 'HashtagTrendCard';

export default HashtagTrendCard;