import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JurnalSchema, Student } from '../types/jurnalSchema';

const initialState: JurnalSchema = {
  subject_id: 0,
  group_id: 0,
  students: [],
};

export const jurnalSlice = createSlice({
  name: 'jurnal',
  initialState,
  reducers: {
    setSubjectId: (state, action: PayloadAction<number>) => {
      state.subject_id = action.payload;
    },
    setGroupId: (state, action: PayloadAction<number>) => {
      state.group_id = action.payload;
    },
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
  },
});

export const { actions: jurnalActions } = jurnalSlice;
export const { reducer: jurnalReducer } = jurnalSlice;

// asdf
