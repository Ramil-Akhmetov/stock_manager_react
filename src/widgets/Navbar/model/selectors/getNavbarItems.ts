import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { getRouteLogin, getRouteMain } from '@/shared/consts/router';
import { NavbarItem } from '../types/navbar.ts';

export const getNavbarItems = createSelector(getUserAuthData, (userData) => {
  // todo selectors = (state: StateSchema) => state.user.authData;
  // public routes
  const sidebarItemsList: NavbarItem[] = [
    {
      path: getRouteLogin(),
      text: 'Вход',
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
