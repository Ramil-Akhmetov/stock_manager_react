import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { getRouteLogin, getRouteRegister } from '@/shared/consts/router';
import { NavbarItem } from '../types/navbar.ts';

export const getNavbarItems = createSelector(getUserAuthData, (userData) => {
  // TODO selectors = (state: StateSchema) => state.user.authData;
  // public routes
  const sidebarItemsList: NavbarItem[] = [
    {
      path: getRouteLogin(),
      text: 'Вход',
    },
    {
      path: getRouteRegister(),
      text: 'Регистрация',
    },
  ];

  // auth routes
  if (userData) {
    sidebarItemsList
      .push
      // {
      //   path: getRouteProfile(userData.id),
      //   Icon: ProfileIcon,
      //   text: 'Профиль',
      //   authOnly: true,
      // },
      ();
  }

  return sidebarItemsList;
});
