import { rtkApi } from '@/shared/api/rtkApi';
import { Item } from '@/shared/entites/Item/item.ts';
import { QueryFilters } from '@/shared/types/queryFilters.ts';
import { ResponseWithPagination } from '@/shared/types/response.ts';

const itemsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getItems: build.query<ResponseWithPagination<Item[]>, QueryFilters>({
      query: (params) => ({
        method: 'GET',
        url: '/items',
        params,
      }),
    }),
  }),
});

export const useGetItems = itemsApi.useGetItemsQuery;
