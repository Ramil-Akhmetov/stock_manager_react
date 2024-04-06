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
import { useNavigate } from 'react-router-dom';
import { useLogoutUser } from '@/features/LogoutUser';
import { getUserAuthData } from '@/entities/User';
import { getRouteProfile, getRouteProfileSettings } from '@/shared/consts/router';

export const AvatarDropdown = memo(() => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const authData = useSelector(getUserAuthData);
  const { logout } = useLogoutUser();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const onLogout = useCallback(async () => {
    await logout();
    setAnchorElUser(null);
  }, [logout]);

  const onProfileClick = useCallback(() => {
    navigate(getRouteProfile(authData?.id));
    setAnchorElUser(null);
  }, [navigate]);

  const onProfileSettingsClick = useCallback(() => {
    navigate(getRouteProfileSettings());
    setAnchorElUser(null);
  }, [navigate]);

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
        <MenuItem onClick={onProfileClick}>
          <Typography textAlign="center">Профиль</Typography>
        </MenuItem>
        <MenuItem onClick={onProfileSettingsClick}>
          <Typography textAlign="center">Настройки</Typography>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <Typography textAlign="center">Выход</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
});
