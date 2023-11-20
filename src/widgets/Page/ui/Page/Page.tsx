import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { memo, ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
}
export const Page = memo((props: PageProps) => {
  const { children } = props;
  return (
    <Box component="main" sx={{ p: 3 }} width="100%">
      <Toolbar />
      {children}
    </Box>
  );
});
