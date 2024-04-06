import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersTableSchema } from '../types/usersTableSchema';

const initialState: UsersTableSchema = {};

export const usersTableSlice = createSlice({
  name: 'usersTable',
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {},
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

export const { actions: usersTableActions } = usersTableSlice;
export const { reducer: usersTableReducer } = usersTableSlice;
