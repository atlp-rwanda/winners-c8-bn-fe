import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <Box>
        <Typography fontSize="50px">Page you looking is not found</Typography>
        <Button>
          <Link to="/">Go back</Link>
        </Button>
      </Box>
    </>
  );
}

export default NotFound;
