import {Semesters} from './semesters.model';

export interface Curriculum {
  name: string;
  semesters: Semesters[];
}
