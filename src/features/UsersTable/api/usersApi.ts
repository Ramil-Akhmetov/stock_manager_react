import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '@/shared/entites/User/user.ts';
import { QueryFilters } from '@/shared/types/queryFilters.ts';
import { ResponseWithPagination } from '@/shared/types/responseApi.ts';

const usersApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<ResponseWithPagination<User[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/users',
        params,
      }),
    }),
  }),
});

export const useGetUsers = usersApi.useGetUsersQuery;
