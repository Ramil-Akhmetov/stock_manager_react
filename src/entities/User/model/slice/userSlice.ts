import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema, User } from '../types/user';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { initAuthData } from '@/entities/User/model/services/initAuthData.ts';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.authData = action.payload.user;
      localStorage.setItem(LOCAL_STORAGE_ACCESS_KEY, action.payload.token);
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      initAuthData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload;
        state._inited = true;
      }
    );
    builder.addCase(initAuthData.rejected, (state) => {
      state._inited = true;
    });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
