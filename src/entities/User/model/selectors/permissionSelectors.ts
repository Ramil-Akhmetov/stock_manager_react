import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserPermission } from '../consts/userConsts.ts';

export const getUserPermissions = (state: StateSchema) =>
  state.user.authData?.permissions;

export const canUsersCreate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.USERS_CREATE))
);

export const canUsersRead = createSelector(getUserPermissions, (permissions) =>
  Boolean(permissions?.includes(UserPermission.USERS_READ))
);

export const canUsersUpdate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.USERS_UPDATE))
);

export const canUsersDelete = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.USERS_DELETE))
);

export const canCategoriesCreate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CATEGORIES_CREATE))
);

export const canCategoriesRead = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CATEGORIES_READ))
);

export const canCategoriesUpdate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CATEGORIES_UPDATE))
);

export const canCategoriesDelete = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CATEGORIES_DELETE))
);

export const canItemsCreate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.ITEMS_CREATE))
);

export const canItemsRead = createSelector(getUserPermissions, (permissions) =>
  Boolean(permissions?.includes(UserPermission.ITEMS_READ))
);

export const canItemsUpdate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.ITEMS_UPDATE))
);

export const canItemsDelete = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.ITEMS_DELETE))
);

export const canTypesCreate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.TYPES_CREATE))
);

export const canTypesRead = createSelector(getUserPermissions, (permissions) =>
  Boolean(permissions?.includes(UserPermission.TYPES_READ))
);

export const canTypesUpdate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.TYPES_UPDATE))
);

export const canTypesDelete = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.TYPES_DELETE))
);

export const canGroupsCreate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.GROUPS_CREATE))
);

export const canGroupsRead = createSelector(getUserPermissions, (permissions) =>
  Boolean(permissions?.includes(UserPermission.GROUPS_READ))
);

export const canGroupsUpdate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.GROUPS_UPDATE))
);

export const canGroupsDelete = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.GROUPS_DELETE))
);

export const canRoomTypesCreate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.ROOM_TYPES_CREATE))
);

export const canRoomTypesRead = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.ROOM_TYPES_READ))
);

export const canRoomTypesUpdate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.ROOM_TYPES_UPDATE))
);

export const canRoomTypesDelete = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.ROOM_TYPES_DELETE))
);

export const canRoomsCreate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.ROOMS_CREATE))
);

export const canRoomsRead = createSelector(getUserPermissions, (permissions) =>
  Boolean(permissions?.includes(UserPermission.ROOMS_READ))
);

export const canRoomsUpdate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.ROOMS_UPDATE))
);

export const canRoomsDelete = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.ROOMS_DELETE))
);

export const canConfirmationsCreate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CONFIRMATIONS_CREATE))
);

export const canConfirmationsRead = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CONFIRMATIONS_READ))
);

export const canConfirmationsUpdate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CONFIRMATIONS_UPDATE))
);

export const canConfirmationsDelete = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CONFIRMATIONS_DELETE))
);

export const canCustomersCreate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CUSTOMERS_CREATE))
);

export const canCustomersRead = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.CUSTOMERS_READ))
);

export const canCustomersUpdate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CUSTOMERS_UPDATE))
);

export const canCustomersDelete = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CUSTOMERS_DELETE))
);

export const canSuppliersCreate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.SUPPLIERS_CREATE))
);

export const canSuppliersRead = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.SUPPLIERS_READ))
);

export const canSuppliersUpdate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.SUPPLIERS_UPDATE))
);

export const canSuppliersDelete = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.SUPPLIERS_DELETE))
);

export const canCheckinsCreate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CHECKINS_CREATE))
);

export const canCheckinsRead = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.CHECKINS_READ))
);

export const canCheckinsUpdate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CHECKINS_UPDATE))
);

export const canCheckinsDelete = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CHECKINS_DELETE))
);

export const canCheckoutsCreate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CHECKOUTS_CREATE))
);

export const canCheckoutsRead = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.CHECKOUTS_READ))
);

export const canCheckoutsUpdate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CHECKOUTS_UPDATE))
);

export const canCheckoutsDelete = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.CHECKOUTS_DELETE))
);

export const canTransfersCreate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.TRANSFERS_CREATE))
);

export const canTransfersRead = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.TRANSFERS_READ))
);

export const canTransfersUpdate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.TRANSFERS_UPDATE))
);

export const canTransfersDelete = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.TRANSFERS_DELETE))
);

export const canPermissionsRead = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.PERMISSIONS_READ))
);

export const canActivitiesRead = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.ACTIVITIES_READ))
);

export const canRolesCreate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.ROLES_CREATE))
);

export const canRolesRead = createSelector(getUserPermissions, (permissions) =>
  Boolean(permissions?.includes(UserPermission.ROLES_READ))
);

export const canRolesUpdate = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.ROLES_UPDATE))
);

export const canRolesDelete = createSelector(
  getUserPermissions,
  (permissions) => Boolean(permissions?.includes(UserPermission.ROLES_DELETE))
);

export const canResponsibilitiesCreate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.RESPONSIBILITIES_CREATE))
);

export const canResponsibilitiesRead = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.RESPONSIBILITIES_READ))
);

export const canResponsibilitiesUpdate = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.RESPONSIBILITIES_UPDATE))
);

export const canResponsibilities = createSelector(
  getUserPermissions,
  (permissions) =>
    Boolean(permissions?.includes(UserPermission.RESPONSIBILITIES_DELETE))
);
