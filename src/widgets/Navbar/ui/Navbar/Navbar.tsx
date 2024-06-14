import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AvatarDropdown } from '@/widgets/AvatarDropdown/index.ts';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { getUserAuthData } from '@/entities/User';
import { getRouteMain } from '@/shared/consts/router.ts';

export function Navbar() {
  const navigate = useNavigate();
  const authData = useSelector(getUserAuthData);

  // State for menu anchors
  const [usersAnchorEl, setUsersAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [goodsAnchorEl, setGoodsAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [paramsAnchorEl, setParamsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  // Boolean values to check if menus are open
  const isUsersOpen = Boolean(usersAnchorEl);
  const isGoodsOpen = Boolean(goodsAnchorEl);
  const isParamsOpen = Boolean(paramsAnchorEl);

  // Event handlers to open menus
  const openUsers = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUsersAnchorEl(event.currentTarget);
  };

  const openGoods = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGoodsAnchorEl(event.currentTarget);
  };

  const openParams = (event: React.MouseEvent<HTMLButtonElement>) => {
    setParamsAnchorEl(event.currentTarget);
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const [isKeeper, setIsKeeper] = useState(false);

  useEffect(() => {
    console.log('authdata', authData);
    setIsAdmin(authData?.roles[0].name === 'Администратор');
    setIsKeeper(authData?.roles[0].name === 'Кладовщик');
  }, [authData]);

  // Navigation handlers
  const gotoUsers = () => {
    navigate('/users');
    setUsersAnchorEl(null);
  };

  const gotoInviteCodes = () => {
    navigate('/invite_codes');
    setUsersAnchorEl(null);
  };

  const gotoItems = () => {
    navigate('/items');
    setGoodsAnchorEl(null);
  };

  const gotoCheckins = () => {
    navigate('/checkins');
    setGoodsAnchorEl(null);
  };

  const gotoTransfers = () => {
    navigate('/transfers');
    setGoodsAnchorEl(null);
  };

  const gotoCheckouts = () => {
    navigate('/checkouts');
    setGoodsAnchorEl(null);
  };

  const gotoCategories = () => {
    navigate('/categories');
    setParamsAnchorEl(null);
  };

  const gotoTypes = () => {
    navigate('/types');
    setParamsAnchorEl(null);
  };

  const gotoRooms = () => {
    navigate('/rooms');
    setParamsAnchorEl(null);
  };

  const gotoSuppliers = () => {
    navigate('/suppliers');
    setParamsAnchorEl(null);
  };

  const gotoLogin = () => {
    navigate('/login');
  };

  const gotoRegister = () => {
    navigate('/register');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: { sm: 'block', textDecoration: 'none' },
            }}
            component={Link}
            to={getRouteMain()}
            color="inherit"
          >
            StockManager
          </Typography>
          <Box sx={{ display: { xs: 'flex', sm: 'block' } }}>
            {authData ? (
              <>
                {/* Button for Users Management */}
                {isAdmin && (
                  <>
                    <Button
                      id="users-button"
                      aria-controls={isUsersOpen ? 'users-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={isUsersOpen ? 'true' : undefined}
                      onClick={openUsers}
                      sx={{ color: '#fff' }}
                    >
                      Управление пользователями
                    </Button>
                    <Menu
                      id="users-menu"
                      anchorEl={usersAnchorEl}
                      open={isUsersOpen}
                      onClose={() => setUsersAnchorEl(null)}
                      MenuListProps={{ 'aria-labelledby': 'users-button' }}
                    >
                      <MenuItem onClick={gotoUsers}>Пользователи</MenuItem>
                      <MenuItem onClick={gotoInviteCodes}>
                        Коды приглашения
                      </MenuItem>
                    </Menu>
                  </>
                )}

                {/* Button for Goods Management */}
                <Button
                  id="goods-button"
                  aria-controls={isGoodsOpen ? 'goods-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isGoodsOpen ? 'true' : undefined}
                  onClick={openGoods}
                  sx={{ color: '#fff' }}
                >
                  Управление объектами
                </Button>
                <Menu
                  id="goods-menu"
                  anchorEl={goodsAnchorEl}
                  open={isGoodsOpen}
                  onClose={() => setGoodsAnchorEl(null)}
                  MenuListProps={{ 'aria-labelledby': 'goods-button' }}
                >
                  <MenuItem onClick={gotoItems}>Объекты</MenuItem>
                  {(isAdmin || isKeeper) && (
                    <>
                      <MenuItem onClick={gotoCheckins}>Поступления</MenuItem>
                      <MenuItem onClick={gotoCheckouts}>Cписания</MenuItem>
                    </>
                  )}
                  <MenuItem onClick={gotoTransfers}>Перемещения</MenuItem>
                </Menu>

                {(isAdmin || isKeeper) && (
                  <>
                    {/* Button for Parameters Management */}
                    <Button
                      id="params-button"
                      aria-controls={isParamsOpen ? 'params-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={isParamsOpen ? 'true' : undefined}
                      onClick={openParams}
                      sx={{ color: '#fff' }}
                    >
                      Управление параметрами
                    </Button>
                    <Menu
                      id="params-menu"
                      anchorEl={paramsAnchorEl}
                      open={isParamsOpen}
                      onClose={() => setParamsAnchorEl(null)}
                      MenuListProps={{ 'aria-labelledby': 'params-button' }}
                    >
                      <MenuItem onClick={gotoCategories}>
                        Категории объектов
                      </MenuItem>
                      <MenuItem onClick={gotoTypes}>Типы объектов</MenuItem>
                      <MenuItem onClick={gotoRooms}>Помещения</MenuItem>
                      <MenuItem onClick={gotoSuppliers}>Поставщики</MenuItem>
                    </Menu>
                  </>
                )}

                <ThemeSwitcher />
              </>
            ) : (
              <>
                <Button onClick={gotoLogin} sx={{ color: '#fff' }}>
                  Вход
                </Button>
                <Button onClick={gotoRegister} sx={{ color: '#fff' }}>
                  Регистрация
                </Button>
              </>
            )}
          </Box>
          {authData && <AvatarDropdown />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
