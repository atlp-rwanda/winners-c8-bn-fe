import { Box, Button, Typography } from '@mui/material';
import NotAccessible from '@mui/icons-material/NotAccessible';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          <NotAccessible />
          <Typography variant="h2">Page you looking is not found</Typography>
          <Button>
            <Link to="/">Go back</Link>
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default NotFound;
