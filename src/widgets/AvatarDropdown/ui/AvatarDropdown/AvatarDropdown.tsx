import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLogoutUser } from '@/features/LogoutUser';
import { getUserAuthData } from '@/entities/User';

export const AvatarDropdown = memo(() => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const authData = useSelector(getUserAuthData);

  const { logout } = useLogoutUser();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  // TODO maybe add logout as feature
  const onLogout = useCallback(async () => {
    await logout();
    setAnchorElUser(null);
  }, [logout]);

  if (!authData) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Настройки">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={authData.name} src={authData.photo} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Профиль</Typography>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <Typography textAlign="center">Выход</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
});
