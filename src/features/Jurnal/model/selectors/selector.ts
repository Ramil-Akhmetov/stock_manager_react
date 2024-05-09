import { StateSchema } from '@/app/providers/StoreProvider';

export const getSubjectId = (state: StateSchema) => state.jurnal.subject_id;
export const getGroupId = (state: StateSchema) => state.jurnal.group_id;
export const getStudents = (state: StateSchema) => state.jurnal.students;
