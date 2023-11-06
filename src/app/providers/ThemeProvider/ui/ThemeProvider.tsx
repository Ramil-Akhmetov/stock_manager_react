import { PaletteMode } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ReactNode, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_MODE_KEY } from '@/shared/consts/localstorage.ts';
import { ThemeContext } from '../lib/ThemeContext';
import { darkTheme } from '../lib/themes/dark/darkTheme';
import { lightTheme } from '../lib/themes/light/lightTheme';

const defaultMode =
  (localStorage.getItem(LOCAL_STORAGE_THEME_MODE_KEY) as PaletteMode) ||
  'light';

interface ThemeProviderProps {
  initialMode?: PaletteMode;
  children: ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { initialMode, children } = props;
  const [mode, setMode] = useState<PaletteMode>(initialMode || defaultMode);

  const defaultProps = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode]
  );

  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
