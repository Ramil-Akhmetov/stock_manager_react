import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResetPasswordSchema } from '../types/resetPasswordSchema.ts';

const initialState: ResetPasswordSchema = {
  old_password: '',
  new_password: 'password',
  new_password_confirmation: 'password',
};

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    setOldPassword: (state, action: PayloadAction<string>) => {
      state.old_password = action.payload;
    },
    setNewPassword: (state, action: PayloadAction<string>) => {
      state.new_password = action.payload;
    },
    setNewPasswordConfirmation: (state, action: PayloadAction<string>) => {
      state.new_password_confirmation = action.payload;
    },
  },
});

export const { actions: resetPasswordActions } = resetPasswordSlice;
export const { reducer: resetPasswordReducer } = resetPasswordSlice;
