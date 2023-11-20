import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterUserSchema } from '../types/RegisterUserSchema';

const initialState: RegisterUserSchema = {
  invite_code: '',
  email: '',
  password: '',
  password_confirmation: '',
};

export const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState,
  reducers: {
    setInviteCode: (state, action: PayloadAction<string>) => {
      state.invite_code = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPasswordConfirmation: (state, action: PayloadAction<string>) => {
      state.password_confirmation = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(, (state) => {
  //       state.error = undefined;
  //       state.isLoading = true;
  //     })
  //     .addCase(, (state) => {
  //       state.isLoading = false;
  //     })
  //     .addCase(, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const { actions: registerUserActions } = registerUserSlice;
export const { reducer: registerUserReducer } = registerUserSlice;
