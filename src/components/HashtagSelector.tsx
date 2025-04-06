import React, { useState, useCallback } from 'react';
import { TextField, Autocomplete, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

interface HashtagSelectorProps {
  currentHashtag?: string;
}

const POPULAR_HASHTAGS = [
  '#uri', 
  '#tech', 
  '#news', 
  '#trending', 
  '#viral'
];

const HashtagSelector: React.FC<HashtagSelectorProps> = React.memo(({ currentHashtag }) => {
  const router = useRouter();
  const [value, setValue] = useState<string>(currentHashtag || '');
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = useCallback((_event: React.SyntheticEvent, newValue: string | null) => {
    setValue(newValue || '');
  }, []);

  const handleViewInsights = useCallback(() => {
    if (!value) return;
    
    // Remove # if present
    const normalizedValue = value.startsWith('#') ? value.substring(1) : value;
    router.push(`/insights/${normalizedValue}`);
  }, [value, router]);

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
      <Autocomplete
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={POPULAR_HASHTAGS}
        freeSolo
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search or select hashtag"
            variant="outlined"
            size="medium"
          />
        )}
        sx={{ maxWidth: 400 }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleViewInsights}
        disabled={!value}
      >
        View Insights
      </Button>
    </Box>
  );
});

HashtagSelector.displayName = 'HashtagSelector';

export default HashtagSelector;