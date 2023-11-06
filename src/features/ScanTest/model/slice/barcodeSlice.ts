import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BarcodeSchema } from '../types/barcodeSchema.ts';

const initialState: BarcodeSchema = {
  barcode: '',
};

export const barcodeSlice = createSlice({
  name: 'barcode',
  initialState,
  reducers: {
    setBarcode: (state, action: PayloadAction<string>) => {
      state.barcode = action.payload;
    },
  },
});

export const { actions: barcodeActions } = barcodeSlice;
export const { reducer: barcodeReducer } = barcodeSlice;
