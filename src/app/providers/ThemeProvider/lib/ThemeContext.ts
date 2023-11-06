import { PaletteMode } from '@mui/material';
import { createContext } from 'react';

export interface ThemeContextProps {
  mode?: PaletteMode;
  setMode?: (theme: PaletteMode) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
