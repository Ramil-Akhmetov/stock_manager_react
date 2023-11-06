import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOCAL_STORAGE_ACCESS_KEY } from '../consts/localstorage.ts';

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_KEY) || '';
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Accept', 'application/json');
      // headers.set('Content-type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
