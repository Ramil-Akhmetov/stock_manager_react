import { memo, useCallback, useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';

export const AvatarDropdown = memo(() => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const authData = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
    setAnchorElUser(null);
  }, [dispatch]);

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
