import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemsTableSchema } from '../types/itemsTableSchema';

const initialState: ItemsTableSchema = {};

export const itemsTableSlice = createSlice({
  name: 'itemsTable',
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

export const { actions: itemsTableActions } = itemsTableSlice;
export const { reducer: itemsTableReducer } = itemsTableSlice;
