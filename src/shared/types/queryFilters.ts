import { SortOrder } from './sort.ts';

export interface QueryFilters {
  limit: number;
  page: number;
  order: SortOrder;
  orderBy: string;
  search?: string;
}
