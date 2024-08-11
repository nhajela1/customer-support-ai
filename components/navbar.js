"use client"

import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { usePathname } from 'next/navigation';

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
  width: '100%',
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

const CenterBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});

export default function Navbar() {
  const pathname = usePathname();
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

  // console.log(pathname)


  return (
    <Header>
      <HeaderContent>
        <a href="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
          <HeaderText variant="h6" component="span">Customer Support AI</HeaderText>
        </a>


        {pathname === '/admin' && (
          <CenterBox>
            <a href="/chat" style={{
              display: 'flex', justifyContent: 'center', color: 'inherit', textDecoration: 'none',
              border: '1px solid #fff',
              borderRadius: '8%',
              cursor: 'pointer',
              padding: '3px 10px 3px 3px',
            }}>
              <HeaderText variant="h6" component="span">Chat</HeaderText>
            </a>
          </CenterBox>
        )}

        <IconButton
          onClick={handleMenuOpen}
          color="inherit"
          sx={{ marginLeft: 'auto' }}
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
