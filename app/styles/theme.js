import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e5e7eb',
    },
    error: {
      main: '#dc2626',
    },
    // typography: {
    //   fontFamily: 'Roboto, Arial, sans-serif',
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          transition: 'background-color 0.3s, color 0.3s',
          '&:hover': {
            backgroundColor: '#333333',
            color: '#ffffff',
          },
          '&:active': {
            backgroundColor: '#555555',
            color: '#ffffff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
  },
});

export default theme;