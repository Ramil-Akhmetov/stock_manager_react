import { rtkApi } from '@/shared/api/rtkApi';
import { Item } from '@/shared/entites/Item/item.ts';
import { QueryFilters } from '@/shared/types/queryFilters.ts';
import { ResponseWithPagination } from '@/shared/types/responseApi.ts';

const jurnalApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getStudents: build.query<ResponseWithPagination<Item[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/students',
        params,
      }),
    }),
    getGroups: build.query<ResponseWithPagination<Item[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/groups',
        params,
      }),
    }),
    getSubjects: build.query<ResponseWithPagination<Item[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/subjects',
        params,
      }),
    }),
  }),
});

export const useGetStudents = jurnalApi.useGetStudentsQuery;
export const useGetGroups = jurnalApi.useGetGroupsQuery;
export const useGetSubjects = jurnalApi.useGetSubjectsQuery;

// asdf
