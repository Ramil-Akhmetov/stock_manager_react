import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { Role } from '@/shared/entites/Role/role.ts';
import { ResponseApi } from '@/shared/types/responseApi.ts';
import { CreateUserSchema } from '../model/types/createUserSchema.ts';

const createUserApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<
      User,
      CreateUserSchema & { photo?: File | null }
    >({
      query: (body) => ({
        method: 'POST',
        url: '/users',
        body,
        formData: true,
      }),
    }),
    getRoles: build.query<ResponseApi<Role[]>, null>({
      query: (body) => ({
        method: 'GET',
        url: '/roles',
      }),
    }),
  }),
});

export const useCreateUser = createUserApi.useCreateUserMutation;
export const useGetRoles = createUserApi.useGetRolesQuery;
