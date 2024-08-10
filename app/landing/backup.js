'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TypingEffect from 'react-typing-effect';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e5e7eb', // Light grey
    },
    background: {
      default: '#000000', // Black background
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#e5e7eb', // Light grey text
    },
  },
});

const LandingPage = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Customer Support AI
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
          textAlign="center"
        >
          <Typography variant="h3" component="h1" gutterBottom color="textPrimary">
            <TypingEffect
              text={['Hi I\'m your Customer Support AI']}
              speed={50}
              eraseSpeed={50}
              eraseDelay={2000}
              typingDelay={500}
              cursorRenderer={(cursor) => <Typography variant="h3" color="textPrimary">{cursor}</Typography>}
            />
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleSignIn} sx={{ mt: 4 }}>
            Sign In
          </Button>
        </Box>

        {/* Features Section */}
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: '2rem 0',
            mt: 4, // Margin top to ensure separation from the previous content
            borderTop: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;