import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateUserPageSchema } from '../types/createUserPageSchema';

const initialState: CreateUserPageSchema = {};

export const createUserPageSlice = createSlice({
  name: 'createUserPage',
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

export const { actions: createUserPageActions } = createUserPageSlice;
export const { reducer: createUserPageReducer } = createUserPageSlice;
