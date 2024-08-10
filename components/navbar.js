"use client"

import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../utils/firebase';
import { usePathname } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

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
  cursor: 'pointer',
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
  const [isBotSetup, setIsBotSetup] = useState(false);
  const [companyID, setCompanyID] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsBotSetup(!!userData.companyID);
          setCompanyID(userData.companyID || '');
        }
      } else {
        setUserEmail('');
        setIsBotSetup(false);
        setCompanyID('');
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

  const handleHeaderClick = () => {
    if (isBotSetup) {
      router.push(`/chat?companyID=${companyID}`);
    } else {
      alert('The bot is not set up yet. Please complete the setup in the admin dashboard.');
    }
  };

  return (
    <Header>
      <HeaderContent>
        <HeaderText variant="h6" component="span" onClick={handleHeaderClick}>
          Customer Support AI
        </HeaderText>
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
