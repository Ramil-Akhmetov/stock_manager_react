import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LOCAL_STORAGE_ACCESS_KEY } from '@/shared/consts/localstorage.ts';
import { User } from '@/shared/entites/User/user.ts';
import { getUserAuthData } from '../../api/userApi.ts';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      // const response = await dispatch(getUserAuthData('')).unwrap();
      const response = await fetch(`${__API__}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_ACCESS_KEY
          )}`,
          Accept: 'application/json',
        },
      });
      const data = await response.json();

      // if (response.data.email_verified_at === null) {
      //   enqueueSnackbar('Подтвердите электронную почту', {
      //     variant: 'warning',
      //   });
      // }
      // return response.data;
      return data.data;
    } catch (e) {
      return rejectWithValue('');
    }
  }
);
