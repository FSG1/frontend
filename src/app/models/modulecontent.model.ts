import {LearningGoal} from './learninggoal';

export interface ModuleContent {
  module_code: string;
  module_name: string;
  credits: number;
  learninggoals: LearningGoal[];
}
