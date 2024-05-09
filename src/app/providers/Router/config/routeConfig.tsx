import { CreateUserPage } from '@/pages/CreateUserPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { ItemsPage } from '@/pages/ItemsPage';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ProfileSettingsPage } from '@/pages/ProfileSettingsPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { UsersPage } from '@/pages/UsersPage';
import {
  AppRoute,
  getRouteCreateUser,
  getRouteItems,
  getRouteLogin,
  getRouteMain,
  getRouteProfile,
  getRouteProfileSettings,
  getRouteRegister,
  getRouteUsers,
} from '@/shared/consts/router';
import { AppRouteProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoute, AppRouteProps> = {
  [AppRoute.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoute.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoute.PROFILE_SETTINGS]: {
    path: getRouteProfileSettings(),
    element: <ProfileSettingsPage />,
    authOnly: true,
  },
  [AppRoute.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
    guestOnly: true,
  },
  [AppRoute.REGISTER]: {
    path: getRouteRegister(),
    element: <RegisterPage />,
    guestOnly: true,
  },
  [AppRoute.ITEMS]: {
    path: getRouteItems(),
    element: <ItemsPage />,
    authOnly: true,
  },
  [AppRoute.USERS]: {
    path: getRouteUsers(),
    element: <UsersPage />,
    authOnly: true,
  },
  [AppRoute.CREATE_USER]: {
    path: getRouteCreateUser(),
    element: <CreateUserPage />,
    authOnly: true,
  },
  // last
  [AppRoute.NOT_FOUND]: {
    path: '*',
    element: <ErrorPage message="Страница не найдена" statusCode={404} />,
  },
};
