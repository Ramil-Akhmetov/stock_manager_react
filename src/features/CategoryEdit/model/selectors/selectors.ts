import { StateSchema } from '@/app/providers/StoreProvider';

export const getCategoryEditName = (state: StateSchema) =>
  state?.categoryEdit?.name || '';
