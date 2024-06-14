import { PaginationMeta } from './paginationMeta.ts';

export interface ResponseApi<T> {
  data: T;
}
export interface ResponseWithPagination<T> {
  data: T;
  meta: PaginationMeta;
}
