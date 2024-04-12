import { StateSchema } from '@/app/providers/StoreProvider';

export const getCreateUserEmail = (state: StateSchema) =>
  state?.createUser?.email || '';

export const getCreateUserRole = (state: StateSchema) =>
  state?.createUser?.role || '';

export const getCreateUserName = (state: StateSchema) =>
  state?.createUser?.name || '';

export const getCreateUserSurname = (state: StateSchema) =>
  state?.createUser?.surname || '';

export const getCreateUserPatronymic = (state: StateSchema) =>
  state?.createUser?.patronymic || '';

export const getCreateUserPhone = (state: StateSchema) =>
  state?.createUser?.phone || '';
