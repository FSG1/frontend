import {LearningGoal} from './learninggoal';
import {ArchitecturalLayer} from './architecturallayer';
import {LifecycleActivity} from './lifecycleactivity';

export interface ModuleContent {
  module_code: string;
  module_name: string;
  credits: number;
  architectural_layers: ArchitecturalLayer[];
  lifecycle_activities: LifecycleActivity[];
  learning_goals: LearningGoal[];
}
