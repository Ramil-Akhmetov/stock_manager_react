import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AboutProgramSchema } from '../types/aboutProgramSchema';

const initialState: AboutProgramSchema = {};

export const aboutProgramSlice = createSlice({
  name: 'aboutProgram',
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

export const { actions: aboutProgramActions } = aboutProgramSlice;
export const { reducer: aboutProgramReducer } = aboutProgramSlice;
