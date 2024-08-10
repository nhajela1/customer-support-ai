import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

const MainSection = () => {
  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Image src="/chatbot-logo.png" alt="SaaSLand" width={120} height={120} />
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              Customer Support AI
            </Typography>
            <Typography variant="h6" color="black" paragraph>
              Our software solution empowers companies to efficiently handle all customer queries using our advanced chatbot AI.
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
              <Image
                src="/homepage-screenshot.png" // Replace with your actual image path
                alt="Home Page Screenshot"
                layout="responsive"
                width={700}
                height={475}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MainSection;
