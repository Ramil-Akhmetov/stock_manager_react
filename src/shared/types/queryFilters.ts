import { SortOrder } from './order.ts';

export interface QueryFilters {
  limit: number;
  page: number;
  order: SortOrder;
  orderBy: string;
  search?: string;
}
