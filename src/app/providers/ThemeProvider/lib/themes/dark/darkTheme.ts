import { createTheme } from '@mui/material';
import { baseTheme } from '../baseTheme';

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
  },
});
