export class Student {}

export interface JurnalSchema {
  subject_id: number;
  group_id: number;

  students: Student[];
}
