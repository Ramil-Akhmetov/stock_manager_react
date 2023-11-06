import { rtkApi } from '@/shared/api/rtkApi';
import { LoginSchema } from '@/features/LoginUser';
import { ResetPasswordSchema } from '@/features/ResetPassword';

const resetPasswordApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    resetPassword: build.mutation<{ message: string }, ResetPasswordSchema>({
      query: (body) => ({
        method: 'POST',
        url: '/reset_password',
        body,
      }),
    }),
  }),
});

export const useResetPassword = resetPasswordApi.useResetPasswordMutation;
