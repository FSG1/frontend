import {Module} from './module.model';

/**
 * This model represents a simple semester object.
 * an array of semester is returned by the getSemesters method in backend.service.ts in model.component.ts
 */
export interface Semester {
  semester: number;
  modules: Module[];
}
