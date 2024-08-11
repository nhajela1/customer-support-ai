import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from "@mui/material/Popover"
import Image from 'next/image';
import NavBar from './navbar';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import Link from 'next/link';

const MainSection = () => {

  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetStarted = () => {
    router.push('/login');
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (

    <div>
    
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Image src="/chatbot-logo.png" alt="SaaSLand" width={120} height={120} />
          </Typography>
          <IconButton aria-describedby={id} onClick={handleClick} edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box sx={{ background: "white" }} padding={2} display="flex" flexDirection="column" gap={2}>
              <Link href="/login">
                Login
              </Link>
              <Link href="/signup">
                Sign Up
              </Link>
            </Box>

          </Popover>

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
            <Button variant="contained" color="primary" size="large" onClick={handleGetStarted}>
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
