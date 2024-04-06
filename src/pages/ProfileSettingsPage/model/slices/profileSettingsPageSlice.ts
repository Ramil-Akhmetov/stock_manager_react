import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileSettingsPageSchema } from '../types/profileSettingsPageSchema';

const initialState: ProfileSettingsPageSchema = {};

export const profileSettingsPageSlice = createSlice({
  name: 'profileSettingsPage',
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

export const { actions: profileSettingsPageActions } = profileSettingsPageSlice;
export const { reducer: profileSettingsPageReducer } = profileSettingsPageSlice;
