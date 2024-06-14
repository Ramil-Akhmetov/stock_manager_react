export enum AppRoute {
  MAIN = 'main',
  LOGIN = 'login',
  PROFILE = 'profile',
  REGISTER = 'register',
  PROFILE_SETTINGS = 'profile_settings',

  USERS_CREATE = 'users_create',
  USERS = 'users',
  USERS_EDIT = 'users_edit',

  ITEMS = 'items',
  // last
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteProfileSettings = () => '/profile-settings';
export const getRouteLogin = () => '/login';
export const getRouteRegister = () => '/register';
export const getRouteItems = () => `/items`;
export const getRouteCreateUser = () => '/users/create';
export const getRouteUsers = () => `/users`;
export const getRouteProfile = (id: string) => `/users/${id}`;
export const getRouteUsersEdit = (id: string) => `/users/${id}/edit`;
