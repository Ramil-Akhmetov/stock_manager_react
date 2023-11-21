import { rtkApi } from '@/shared/api/rtkApi';

const logoutUserApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    logoutUser: build.mutation<void, void>({
      query: (body) => ({
        method: 'POST',
        url: '/logout',
        body,
      }),
    }),
  }),
});

export const useLogoutUser = logoutUserApi.useLogoutUserMutation;
