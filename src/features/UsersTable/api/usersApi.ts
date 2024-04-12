import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { QueryFilters } from '@/shared/types/queryFilters.ts';
import { ResponseWithPagination } from '@/shared/types/response.ts';

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
