import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { getUserAuthData } from '@/entities/User';
import { getRouteMain } from '@/shared/consts/router.ts';
import { getNavbarItems } from '../../model/selectors/getNavbarItems.ts';

const drawerWidth = 240;

export const Navbar = memo(() => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navbarItems = useSelector(getNavbarItems);
  const isAuth = useSelector(getUserAuthData);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // todo create component from it
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ my: 2, textDecoration: 'none' }}
        component={Link}
        to={getRouteMain()}
        color="inherit"
      >
        StockManager
      </Typography>
      <Divider />
      <List>
        {navbarItems.map(
          (item) =>
            ((item.authOnly && isAuth) || (!item.authOnly && !isAuth)) && (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ textAlign: 'center' }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )
        )}
        <button>test</button>
        <ThemeSwitcher />
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block', textDecoration: 'none' },
            }}
            component={Link}
            to={getRouteMain()}
            color="inherit"
          >
            StockManager
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ThemeSwitcher />
            {navbarItems.map(
              (item) =>
                ((item.authOnly && isAuth) || (!item.authOnly && !isAuth)) && (
                  <Button
                    component={Link}
                    to={item.path}
                    key={item.text}
                    sx={{ color: '#fff' }}
                  >
                    {item.text}
                  </Button>
                )
            )}
          </Box>
          <AvatarDropdown />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
});
