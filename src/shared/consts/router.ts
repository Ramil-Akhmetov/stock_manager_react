export enum AppRoute {
  MAIN = 'main',
  LOGIN = 'login',
  PROFILE = 'profile',
  // REGISTER = 'register',
  PROFILE_EDIT = 'profile_edit',
  // last
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteProfile = (id: string) => `/users/${id}`;
export const getRouteProfileEdit = () => '/profile-edit';
export const getRouteLogin = () => '/login';
