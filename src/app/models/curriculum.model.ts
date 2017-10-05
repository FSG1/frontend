import {Semester} from './semester.model';

export interface Curriculum {
  name: string;
  semesters: Semester[];
}
