import { rtkApi } from '@/shared/api/rtkApi';
import { Category } from '@/shared/entites/Category/category.ts';
import { ResponseApi } from '@/shared/types/responseApi.ts';
import { CategoryEditSchema } from '../model/types/categoryEditSchema.ts';

const categoryEditApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<ResponseApi<Category>, number>({
      query: (id) => ({
        method: 'GET',
        url: `/categories/${id}`,
      }),
    }),
    editCategory: build.mutation<
      ResponseApi<Category>,
      { body: CategoryEditSchema; id: number }
    >({
      query: ({ body, id }) => ({
        method: 'PUT',
        url: `/categories/${id}`,
        body,
      }),
    }),
    createCategory: build.mutation<
      ResponseApi<Category>,
      { body: CategoryEditSchema; id: number }
    >({
      query: (body) => ({
        method: 'POST',
        url: `/categories}`,
        body,
      }),
    }),
  }),
});

export const useGetCategory = categoryEditApi.useGetCategoryQuery;
export const useEditCategory = categoryEditApi.useEditCategoryMutation;
export const useCreateCategory = categoryEditApi.useCreateCategoryMutation;
