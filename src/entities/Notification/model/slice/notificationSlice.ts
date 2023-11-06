import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationSchema } from '../types/notification';

const initialState: NotificationSchema = {
  isOpen: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { actions: notificationActions } = notificationSlice;
export const { reducer: notificationReducer } = notificationSlice;
