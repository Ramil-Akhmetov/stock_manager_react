import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersPageSchema } from '../types/usersPageSchema';

const initialState: UsersPageSchema = {};

export const usersPageSlice = createSlice({
  name: 'usersPage',
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

export const { actions: usersPageActions } = usersPageSlice;
export const { reducer: usersPageReducer } = usersPageSlice;
