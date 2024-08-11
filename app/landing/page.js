'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainSection from '../../components/main-section';
import Features from '../../components/features';
import Testimonials from '../../components/testimonials';
import FAQ from '../../components/faq';
import ContactForm from '../../components/contact-form';



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
      default: '#fffff', // Black background
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
      {/* <CssBaseline /> */}

      {/* <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
          </Typography>
        </Toolbar>
      </AppBar> */}


      <Container maxWidth="md">

        {/* <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
          textAlign="center"
        >

          <Typography variant="h6" color="inherit">
            Customer Support AI
          </Typography>

          <Button variant="contained" color="secondary" onClick={handleSignIn} sx={{ mt: 4 }}>
            Get Started
          </Button>

        </Box> */}

        {/* Features Section */}
        {/* <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: '2rem 0',
            mt: 4, // Margin top to ensure separation from the previous content
            borderTop: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
        </Box> */}

        <MainSection />

        <Typography variant="h4" sx={{ mt: 8, mb: 2 }} >
          Features
        </Typography>
        <Features />


        <Typography variant="h4" sx={{ mt: 8, mb: 2 }} >
          Testimonials
        </Typography>
        <Testimonials />


        <Typography variant="h4" sx={{ mt: 8,  mb: 2 }} >
          FAQ
        </Typography>
        <FAQ />

        <ContactForm />




      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;
