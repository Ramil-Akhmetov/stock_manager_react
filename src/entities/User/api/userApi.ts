import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUserAuthData: build.query<{ data: User }, string>({
      query: () => ({
        url: `/user`,
        method: 'GET',
      }),
    }),
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const getUserAuthData = userApi.endpoints.getUserAuthData.initiate;
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
