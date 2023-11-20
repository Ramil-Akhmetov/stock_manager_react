import { StateSchema } from '@/app/providers/StoreProvider';

export const getRegisterEmail = (state: StateSchema) =>
  state?.registerUser?.email || '';

export const getRegisterInviteCode = (state: StateSchema) =>
  state?.registerUser?.invite_code || '';

export const getRegisterPassword = (state: StateSchema) =>
  state?.registerUser?.password || '';

export const getRegisterPasswordConfirmation = (state: StateSchema) =>
  state?.registerUser?.password_confirmation || '';
