import { memo, ReactNode } from 'react';
import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

interface PageProps {
  children: ReactNode;
}
export const Page = memo((props: PageProps) => {
  const { children } = props;
  return (
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
      {children}
    </Box>
  );
});
