import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Box } from '@mui/material';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
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
      setFormData({ subject: '', email: '', message: '' });
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
          We&apos;d love to hear from you! Please fill out the form below and we&apos;ll get in touch as soon as possible.
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Subject"
                name="subject"
                fullWidth
                value={formData.subject}
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000',
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
                label="Your E-mail"
                name="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000',
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
                name="message"
                multiline
                rows={4}
                fullWidth
                value={formData.message}
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderColor: '#000',
                    color: '#000',
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
}