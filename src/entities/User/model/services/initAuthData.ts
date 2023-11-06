import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../types/user';
import { getUserAuthData } from '../../api/userApi.ts';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await dispatch(getUserAuthData('')).unwrap();
      return response.data;
    } catch (e) {
      return rejectWithValue('');
    }
  }
);
