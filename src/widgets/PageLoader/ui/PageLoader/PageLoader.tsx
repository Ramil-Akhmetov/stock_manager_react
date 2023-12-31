import { Box, CircularProgress } from '@mui/material';

export function PageLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress color="primary" size={60} />
    </Box>
  );
}
