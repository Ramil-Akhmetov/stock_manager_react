export enum AppRoute {
  MAIN = 'main',
  LOGIN = 'login',
  PROFILE = 'profile',
  REGISTER = 'register',
  PROFILE_SETTINGS = 'profile_settings',
  CREATE_USER = 'create_user',
  USERS = 'users',
  ITEMS = 'items',
  // last
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteProfile = (id: string) => `/users/${id}`;
export const getRouteProfileSettings = () => '/profile-settings';
export const getRouteLogin = () => '/login';
export const getRouteRegister = () => '/register';
export const getRouteItems = () => `/items`;
export const getRouteCreateUser = () => '/users/create';
export const getRouteUsers = () => `/users`;
