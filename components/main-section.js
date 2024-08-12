import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from "@mui/material/Popover"
import Image from 'next/image';
import NavBar from './navbar';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import LinkContainer from './box';

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
          <Typography variant="h6" color="inherit"
            sx={{
              flexGrow: 1,
              '&:hover img': {
                transform: 'scale(1.25)', // Scale the image to 110% on hover
                transition: 'transform 0.3s ease-in-out', // Smooth transition
              },
            }}>
            <Image src="/chatbot-logo.png" alt="SaaSLand" width={120} height={120} style={{ transition: 'transform 0.3s ease-in-out' }} />
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
            <LinkContainer>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </LinkContainer>

            <LinkContainer>
              <Link href="/signup" style={{ textDecoration: 'none' }}>
                Sign Up
              </Link>
            </LinkContainer>

          </Popover>

        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h3" component="h1" gutterBottom>
              <b>Customer Support AI</b>
            </Typography>
            <Typography variant="h6" color="black" paragraph>
              Our software solution empowers companies to efficiently handle all customer queries using our advanced chatbot AI.
            </Typography>
            <Button variant="contained" color="primary" size="large" onClick={handleGetStarted}>
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
              <Image
                src="/chatbot.jpg" // Replace with your actual image path
                alt="conversation with chatbot"
                layout="responsive"
                width={700}
                height={800}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MainSection;
