import { PaginationMeta } from './paginationMeta.ts';

export interface Response<T> {
  data: T;
}
export interface ResponseWithPagination<T> {
  data: T;
  meta: PaginationMeta;
}
