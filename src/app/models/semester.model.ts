import {Module} from './module.model';

export interface Semester {
  semester: number;
  modules: Module[];
}
