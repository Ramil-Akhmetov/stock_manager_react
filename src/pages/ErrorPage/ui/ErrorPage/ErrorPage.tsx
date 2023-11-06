import { Box, Button, Container, Typography } from '@mui/material';
import { memo } from 'react';

interface ErrorPageProps {
  statusCode?: number | string;
  message: string;
  reloadButton?: boolean;
}
function ErrorPage(props: ErrorPageProps) {
  const { statusCode, message, reloadButton } = props;
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h1" component="h1" align="center">
          {statusCode}
        </Typography>
        <Typography variant="h5" align="center" sx={{ marginBottom: '2rem' }}>
          {message}
        </Typography>
        {reloadButton && (
          <Button variant="contained" onClick={reloadPage}>
            Обновить страницу
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default memo(ErrorPage);
