import { rtkApi } from '@/shared/api/rtkApi';
import { PaginationMeta } from '@/shared/types/paginationMeta';
import { ActivityLog } from '../model/types/activityLog';

const activityLogApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getActivityLogs: build.query<
      { data: ActivityLog[]; meta: PaginationMeta },
      { limit: number; page: number; order: 'asc' | 'desc'; orderBy: string }
    >({
      query: ({ limit, page, order, orderBy }) => ({
        method: 'GET',
        url: '/activities',
        params: { limit, page, order, orderBy },
      }),
    }),

    getActivityLog: build.query<{ data: ActivityLog }, number>({
      query: (id) => ({
        method: 'GET',
        url: `/activities/${id}`,
      }),
    }),
  }),
});

export const useGetActivityLogs = activityLogApi.useGetActivityLogsQuery;
export const useGetActivityLog = activityLogApi.useGetActivityLogQuery;
