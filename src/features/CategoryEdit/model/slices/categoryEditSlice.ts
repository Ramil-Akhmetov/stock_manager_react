import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryEditSchema } from '../types/categoryEditSchema';

const initialState: CategoryEditSchema = {
  name: '',
};

export const categoryEditSlice = createSlice({
  name: 'categoryEdit',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
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

export const { actions: categoryEditActions } = categoryEditSlice;
export const { reducer: categoryEditReducer } = categoryEditSlice;
