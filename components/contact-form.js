import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Box } from '@mui/material';



export default function ContactForm() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Your message has been sent!');
      setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
    } else {
      alert('There was a problem sending your message.');
    }
  };



  return (
    <Box my={4}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color="black" paragraph>
          We'd love to hear from you! Please fill out the form below and we'll get in touch as soon as possible.
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Your Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderColor: '#000', // Darker border color
                    color: '#000', // Darker text color
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
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000', // Darker text color
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
                value={formData.subject}
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000', // Darker text color
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
                value={formData.phone}
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000', // Darker text color
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
                value={formData.message}
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000', // Darker text color
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
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};