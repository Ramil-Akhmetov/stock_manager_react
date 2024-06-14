import { QueryFilters } from '../types/queryFilters.ts';
import { ResponseWithPagination } from '../types/responseApi.ts';
import { rtkApi } from './rtkApi.ts';

export const mainApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getInviteCodes: build.query<ResponseWithPagination<any[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/invite_codes',
        params,
      }),
    }),
    getRooms: build.query<ResponseWithPagination<any[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/rooms',
        params,
      }),
    }),
    getCategories: build.query<ResponseWithPagination<any[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/categories',
        params,
      }),
    }),
    getTypes: build.query<ResponseWithPagination<any[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/types',
        params,
      }),
    }),
    getTransfers: build.query<ResponseWithPagination<any[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/transfers',
        params,
      }),
    }),
    getSuppliers: build.query<ResponseWithPagination<any[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/suppliers',
        params,
      }),
    }),
    getCheckins: build.query<ResponseWithPagination<any[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/checkins',
        params,
      }),
    }),
    getItems: build.query<ResponseWithPagination<any[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: `/items`,
        params,
      }),
    }),
    getCheckouts: build.query<ResponseWithPagination<any[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/checkouts',
        params,
      }),
    }),
  }),
});
