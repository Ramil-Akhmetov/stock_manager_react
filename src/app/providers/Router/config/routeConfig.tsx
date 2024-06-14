import { CreateUserPage } from '@/pages/CreateUserPage';
import CategoryEntityCreateEdit from '@/pages/EntityTables/Categories/CategoryEntityCreateEdit';
import { CategoryEntityTable } from '@/pages/EntityTables/Categories/CategoryEntityTable';
import { CategoryTable } from '@/pages/EntityTables/Categories/CategoryTable';
import CheckinEntityCreateEdit from '@/pages/EntityTables/Checkins/CheckinEntityCreateEdit';
import { CheckinEntityTable } from '@/pages/EntityTables/Checkins/CheckinEntityTable';
import { CheckinTable } from '@/pages/EntityTables/Checkins/CheckinTable';
import CheckoutEntityCreateEdit from '@/pages/EntityTables/Checkouts/CheckoutEntityCreateEdit';
import { CheckoutEntityTable } from '@/pages/EntityTables/Checkouts/CheckoutEntityTable';
import { CheckoutTable } from '@/pages/EntityTables/Checkouts/CheckoutTable';
import { InviteCodeEntity } from '@/pages/EntityTables/InviteCode/InviteCodeEntity';
import { InviteCodesTable } from '@/pages/EntityTables/InviteCode/InviteCodesTable';
import { ItemEntityTable } from '@/pages/EntityTables/Item/ItemEntity';
import ItemEntityEdit from '@/pages/EntityTables/Item/ItemEntityEdit';
import { RoomEntityTable } from '@/pages/EntityTables/Rooms/RoomEntity';
import RoomEntityCreateEdit from '@/pages/EntityTables/Rooms/RoomEntityCreateEdit';
import { RoomsTable } from '@/pages/EntityTables/Rooms/RoomsTable';
import SupplierEntityCreateEdit from '@/pages/EntityTables/Suppliers/SupplierEntityCreateEdit';
import { SupplierEntityTable } from '@/pages/EntityTables/Suppliers/SupplierEntityTable';
import { SupplierTable } from '@/pages/EntityTables/Suppliers/SupplierTable';
import TransferEntityCreateEdit from '@/pages/EntityTables/Transfers/TransferEntityCreateEdit';
import { TransferEntityTable } from '@/pages/EntityTables/Transfers/TransferEntityTable';
import { TransferTable } from '@/pages/EntityTables/Transfers/TransferTable';
import TypeEntityCreateEdit from '@/pages/EntityTables/Types/TypeEntityCreateEdit';
import { TypeEntityTable } from '@/pages/EntityTables/Types/TypeEntityTable';
import { TypeTable } from '@/pages/EntityTables/Types/TypeTable';
import { UserEntityTable } from '@/pages/EntityTables/User/UserEntity';
import UserEntityCreateEdit from '@/pages/EntityTables/User/UserEntityCreateEdit';
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

export enum Role {
  ADMIN = 'Администратор',
  USER = 'Ответственное лицо',
  STOREKEEPER = 'Кладовщик',
}

export const routeConfig = {
  [AppRoute.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
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
  items: {
    path: getRouteItems(),
    element: <ItemsPage />,
    authOnly: true,
  },
  items_show: {
    path: '/items/:id',
    element: <ItemEntityTable />,
    authOnly: true,
  },
  items_edit: {
    path: '/items/:id/edit',
    element: <ItemEntityEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },

  users: {
    path: '/users',
    element: <UsersPage />,
    authOnly: true,
    roles: [Role.ADMIN],
  },
  user: {
    path: '/users/:id',
    element: <UserEntityTable />,
    authOnly: true,
    roles: [Role.ADMIN],
  },
  users_create: {
    path: '/users/create',
    element: <UserEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN],
  },
  users_edit: {
    path: '/users/:id/edit',
    element: <UserEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN],
  },
  invite_codes: {
    path: '/invite_codes',
    element: <InviteCodesTable />,
    authOnly: true,
    roles: [Role.ADMIN],
  },
  invite_codes_show: {
    path: '/invite_codes/:id',
    element: <InviteCodeEntity />,
    authOnly: true,
    roles: [Role.ADMIN],
  },

  rooms: {
    path: '/rooms',
    element: <RoomsTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  rooms_show: {
    path: '/rooms/:id',
    element: <RoomEntityTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  rooms_create: {
    path: '/rooms/create',
    element: <RoomEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  rooms_edit: {
    path: '/rooms/:id/edit',
    element: <RoomEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },

  categories: {
    path: '/categories',
    element: <CategoryTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  category_show: {
    path: '/categories/:id',
    element: <CategoryEntityTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  category_create: {
    path: '/categories/create',
    element: <CategoryEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  category_edit: {
    path: '/categories/:id/edit',
    element: <CategoryEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },

  types: {
    path: '/types',
    element: <TypeTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  type_show: {
    path: '/types/:id',
    element: <TypeEntityTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  type_create: {
    path: '/types/create',
    element: <TypeEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  type_edit: {
    path: '/types/:id/edit',
    element: <TypeEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  transfers: {
    path: '/transfers',
    element: <TransferTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER, Role.USER],
  },
  transfers_show: {
    path: '/transfers/:id',
    element: <TransferEntityTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER, Role.USER],
  },
  transfers_create: {
    path: '/transfers/create',
    element: <TransferEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER, Role.USER],
  },

  suppliers: {
    path: '/suppliers',
    element: <SupplierTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  supplier_show: {
    path: '/suppliers/:id',
    element: <SupplierEntityTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  supplier_create: {
    path: '/suppliers/create',
    element: <SupplierEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  supplier_edit: {
    path: '/suppliers/:id/edit',
    element: <SupplierEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },

  checkins: {
    path: '/checkins',
    element: <CheckinTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  checkins_create: {
    path: '/checkins/create',
    element: <CheckinEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  checkins_show: {
    path: '/checkins/:id',
    element: <CheckinEntityTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  checkouts: {
    path: '/checkouts',
    element: <CheckoutTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  checkouts_create: {
    path: '/checkouts/create',
    element: <CheckoutEntityCreateEdit />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },
  checkouts_show: {
    path: '/checkouts/:id',
    element: <CheckoutEntityTable />,
    authOnly: true,
    roles: [Role.ADMIN, Role.STOREKEEPER],
  },

  // last
  not_found: {
    path: '*',
    element: <ErrorPage message="Страница не найдена" statusCode={404} />,
  },
};
