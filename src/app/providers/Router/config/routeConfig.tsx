import { ErrorPage } from '@/pages/ErrorPage';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { ProfileEditPage } from '@/pages/ProfileEditPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
  AppRoute,
  getRouteLogin,
  getRouteMain,
  getRouteProfileEdit,
  getRouteProfile,
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
  [AppRoute.PROFILE_EDIT]: {
    path: getRouteProfileEdit(),
    element: <ProfileEditPage />,
    authOnly: true,
  },
  [AppRoute.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
    guestOnly: true,
  },
  // last
  [AppRoute.NOT_FOUND]: {
    path: '*',
    element: <ErrorPage message="Страница не найдена" statusCode={404} />,
  },
};
