import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { PaginationMeta } from '@/shared/types/paginationMeta';

const usersApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<
      { data: User[]; meta: PaginationMeta },
      {
        limit: number;
        page: number;
        order: 'asc' | 'desc';
        orderBy: string;
        search?: string;
      }
    >({
      query: ({ limit, page, order, orderBy, search }) => ({
        method: 'GET',
        url: '/users',
        params: { limit, page, order, orderBy, search },
      }),
    }),
  }),
});

export const useGetUsers = usersApi.useGetUsersQuery;
