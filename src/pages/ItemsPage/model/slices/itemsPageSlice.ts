import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemsPageSchema } from '../types/itemsPageSchema';

const initialState: ItemsPageSchema = {};

export const itemsPageSlice = createSlice({
  name: 'itemsPage',
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

export const { actions: itemsPageActions } = itemsPageSlice;
export const { reducer: itemsPageReducer } = itemsPageSlice;
