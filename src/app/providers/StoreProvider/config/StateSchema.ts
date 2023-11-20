import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { LoginSchema } from '@/features/LoginUser';
import { RegisterUserSchema } from '@/features/RegisterUser';
import { ResetPasswordSchema } from '@/features/ResetPassword';
import { BarcodeSchema } from '@/features/ScanTest';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  user: UserSchema;

  // Асинхронные редюсеры
  counter?: CounterSchema;
  loginForm?: LoginSchema;
  registerUser?: RegisterUserSchema;
  resetPassword?: ResetPasswordSchema;
  barcodeForm?: BarcodeSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true - вмонтирован, false - демонтирован
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}
