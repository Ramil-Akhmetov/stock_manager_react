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
  }),
});

export const getUserAuthData = userApi.endpoints.getUserAuthData.initiate;
