import {Module} from './module.model';
import {StudentSkill} from './studentskill';

export interface CompleteSemester {
  semester: number;
  modules: Module[];
  qualifications: StudentSkill[];
}
