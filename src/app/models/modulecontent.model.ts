import {LearningGoal} from './learninggoal';
import {ArchitecturalLayer} from "./architecturallayer";
import {LifecycleActivity} from "./lifecycleactivity";

export interface ModuleContent {
  module_code: string;
  module_name: string;
  credits: number;
  architecturallayers: ArchitecturalLayer[];
  lifecycleactivities: LifecycleActivity[];
  learninggoals: LearningGoal[];
}
