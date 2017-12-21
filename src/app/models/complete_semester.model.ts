import {Module} from './module.model';
import {StudentSkill} from './studentskill';
import {LifecycleActivity} from './lifecycleactivity';
import {ArchitecturalLayer} from './architecturallayer';

/**
 * This model is used in semester-overview.component.ts it contains extra information like the skills (HBO-I matrix) after a semester.
 * This model is returned by the getSemesters method in backend-service.ts
 */
export interface CompleteSemester {
  curriculum_name: string;
  modules: Module[];
  qualifications: StudentSkill[];
  lifecycle_activities: LifecycleActivity[];
  architectural_layers: ArchitecturalLayer[];
}
