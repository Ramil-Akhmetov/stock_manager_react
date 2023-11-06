import { StateSchema } from '@/app/providers/StoreProvider';

export const getOldPassword = (state: StateSchema) =>
  state?.resetPassword?.old_password || '';
export const getNewPassword = (state: StateSchema) =>
  state?.resetPassword?.new_password || '';
export const getNewPasswordConfirmation = (state: StateSchema) =>
  state?.resetPassword?.new_password_confirmation || '';
