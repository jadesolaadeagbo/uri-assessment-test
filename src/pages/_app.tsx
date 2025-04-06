import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery, PaletteMode } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';

function MyApp({ Component, pageProps }: AppProps) {

// System preference is default mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

  // Toggle theme mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' 
            ? {
                primary: {
                  main: '#90caf9',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              } 
            : {
                primary: {
                  main: '#1976d2',
                },
              }),
        },
      }),
    [mode],
  );

  return (
    <>
      <Head>
        <title>Hashtag Sentiment Insights</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          position: 'fixed', 
          top: 16, 
          right: 16, 
          zIndex: 1100,
          backgroundColor: 'background.paper',
          borderRadius: '50%',
          boxShadow: theme.shadows[4],
        }}>
          <IconButton 
            onClick={toggleColorMode} 
            color="inherit"
            aria-label="toggle dark mode"
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;