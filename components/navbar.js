import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/navigation';

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  position: 'relative',
  width: '100%',
  padding: 10,
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
}));

export default function Navbar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Header>
      <HeaderContent>
        <a href="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
          <HeaderText variant="h6" component="span">Customer Support AI</HeaderText>
        </a>
        <IconButton
          onClick={handleMenuOpen}
          sx={{ marginLeft: 'auto' }}
          color="inherit"
        >
          <AccountCircle fontSize="large" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Typography variant="body2">{userEmail}</Typography>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <Logout fontSize="small" />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>Sign Out</Typography>
          </MenuItem>
        </Menu>
      </HeaderContent>
    </Header>
  );
}