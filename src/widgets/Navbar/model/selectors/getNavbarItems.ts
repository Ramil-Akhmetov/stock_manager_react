import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import {
  getRouteLogin,
  getRouteRegister,
  getRouteUsers,
} from '@/shared/consts/router';
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
    sidebarItemsList.push(
      {
        path: '/',
        text: 'Объекты',
        authOnly: true,
      },
      {
        path: '/',
        text: 'Поступления',
        authOnly: true,
      },
      {
        path: '/',
        text: 'Отчисления',
        authOnly: true,
      },
      {
        path: getRouteUsers(),
        text: 'Пользователи',
        authOnly: true,
      },
      {
        path: '/',
        text: 'Управление',
        authOnly: true,
      }
    );
  }

  return sidebarItemsList;
});
