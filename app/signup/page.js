'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Suspense } from 'react';
import { Box, Button, Container, Typography, TextField, AppBar, Toolbar, CssBaseline, FormControlLabel, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { useSearchParams } from 'next/navigation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e5e7eb',
    },
    background: {
      default: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e5e7eb',
    },
  },
});

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(true);
  const [companyName, setCompanyName] = useState('');
  const searchParams = useSearchParams();
  const companyID = searchParams.get('companyID');

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password.length <= 5) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    let finalCompanyID = companyID;
    if (!isAdmin && !companyID) {
      if (!companyName.trim()) {
        setError('Company name is required for non-admin users.');
        return;
      }
      finalCompanyID = companyName.trim().toLowerCase().replace(/\s+/g, '-');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        isAdmin: isAdmin,
        companyID: finalCompanyID,
        messages: []
      });

      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push(`/chat?companyID=${finalCompanyID}`);
      }
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'An account already exists with this email address.';
          break;
        default:
          errorMessage = 'Failed to sign up. Please check your details and try again.';
      }
      setError(errorMessage);
    }
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Customer Support AI
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
          textAlign="center"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: theme.palette.text.primary } }}
              InputProps={{
                style: { color: theme.palette.text.primary },
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.secondary.main,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.text.primary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.text.primary,
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: theme.palette.text.primary } }}
              InputProps={{
                style: { color: theme.palette.text.primary },
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.secondary.main,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.text.primary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.text.primary,
                  },
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  name="isAdmin"
                  sx={{
                    color: theme.palette.secondary.main,
                    '&.Mui-checked': {
                      color: theme.palette.secondary.main,
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>
                  Sign up as Admin
                </Typography>
              }
            />
            {!isAdmin && !companyID && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="companyName"
                label="Company Name"
                id="companyName"
                variant="outlined"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                InputProps={{
                  style: { color: theme.palette.text.primary },
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.secondary.main,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.text.primary,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.text.primary,
                    },
                  },
                }}
              />
            )}
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="text"
              color="secondary"
              onClick={handleSignIn}
            >
              Already have an account? Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Suspense>
  );
};

export default SignUpPage;