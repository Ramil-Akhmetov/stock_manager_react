import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateUserSchema } from '../types/createUserSchema';

const initialState: CreateUserSchema = {
  role: '',
  name: '',
  surname: '',
  patronymic: '',

  email: '',
  phone: '',
};

export const createUserSlice = createSlice({
  name: 'createUser',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload;
    },
    setPatronymic: (state, action: PayloadAction<string>) => {
      state.patronymic = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
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

export const { actions: createUserActions } = createUserSlice;
export const { reducer: createUserReducer } = createUserSlice;
