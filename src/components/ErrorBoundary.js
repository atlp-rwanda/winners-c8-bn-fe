import { NotAccessible } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
const logErrorToMyService = (error, errorInfo) => {
  console.log(errorInfo, error);
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
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
            <NotAccessible fontSize="large" />
            <Typography variant="h3">
              Sorry, We currenly having the error
            </Typography>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
