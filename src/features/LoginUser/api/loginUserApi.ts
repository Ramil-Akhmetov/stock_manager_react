import { rtkApi } from '@/shared/api/rtkApi';
import { LoginSchema } from '../model/types/loginSchema.ts';
import { User } from '@/entities/User';

const loginUserApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<{ token: string }, LoginSchema>({
      query: (body) => ({
        method: 'POST',
        url: '/login',
        body,
      }),
    }),
  }),
});

export const useLoginUser = loginUserApi.useLoginUserMutation;
