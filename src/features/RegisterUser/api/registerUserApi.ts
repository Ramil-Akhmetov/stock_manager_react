import { rtkApi } from '@/shared/api/rtkApi';
import { RegisterUserSchema } from '../model/types/RegisterUserSchema';

const registerUserApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<{ token: string }, RegisterUserSchema>({
      query: (body) => ({
        method: 'POST',
        url: '/register',
        body,
      }),
    }),
  }),
});

export const useRegisterUser = registerUserApi.useRegisterUserMutation;
