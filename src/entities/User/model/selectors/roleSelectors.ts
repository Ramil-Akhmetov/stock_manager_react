import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isSuperAdmin = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.SUPER_ADMIN))
);
export const isAdmin = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.ADMIN))
);
