import {Curriculum} from '../curriculum.model';
import {LifecycleActivity} from '../lifecycleactivity';
import {ArchitecturalLayer} from '../architecturallayer';

/**
 * This model contains the values for filters in the qualification-overview.component.ts component.
 * This model is also used in the module-edit.component.ts to get the lifecycle_activities and the architectural_layers
 * This model is returned by the getQualifications method of backend.service.ts
 */
export interface FilterQualifications {
  curricula: Curriculum[];
  lifecycle_activities: LifecycleActivity[];
  architectural_layers: ArchitecturalLayer[];
}
