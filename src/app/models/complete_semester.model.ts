import {Module} from './module.model';
import {StudentSkill} from './studentskill';
import {LifecycleActivity} from './lifecycleactivity';
import {ArchitecturalLayer} from './architecturallayer';

export interface CompleteSemester {
  modules: Module[];
  qualifications: StudentSkill[];
  lifecycle_activities: LifecycleActivity[];
  architectural_layers: ArchitecturalLayer[];
}
