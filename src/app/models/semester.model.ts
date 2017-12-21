import {Module} from './module.model';

// This model represents a simple semester object.
export interface Semester {
  semester: number;
  modules: Module[];
}
