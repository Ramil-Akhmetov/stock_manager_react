import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import { memo, useContext } from 'react';
import { ThemeContext } from '@/app/providers/ThemeProvider';
import { LOCAL_STORAGE_THEME_MODE_KEY } from '@/shared/consts/localstorage.ts';

export const ThemeSwitcher = memo(() => {
  const { mode, setMode } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode?.(newMode);
    localStorage.setItem(LOCAL_STORAGE_THEME_MODE_KEY, newMode);
  };
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
});
