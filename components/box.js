
import { Box } from '@mui/material';

export default function LinkContainer ({children}) {

  return (
    <Box
      sx={{
        background: 'white',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        '&:hover': {
          background: 'lightgray', // Change background color on hover
        },
      }}
    >
      {children}
    </Box>
  );
}