import React from 'react';
import { Container, TextField, Button, Typography, Grid, Box } from '@mui/material';

const ContactForm = () => {
  return (
    <Box my={4}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color="black" paragraph>
          We'd love to hear from you! Please fill out the form below and we'll get in touch as soon as possible.
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Your Name"
                fullWidth
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000' // Darker border color
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: '#000', // Darker label color
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Your E-mail"
                fullWidth
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000'
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: '#000',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Subject"
                fullWidth
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000'
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: '#000',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Phone Number"
                fullWidth
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000'
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: '#000',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Message"
                multiline
                rows={4}
                fullWidth
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000'
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: '#000',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Submit Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default ContactForm;
