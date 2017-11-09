import {QualificationsLearningGoal} from './qualifications_learning_goal.model';

export interface QualificationsModule {
  module_code: number;
  module_name: string;
  credits: number;
  learning_goals: QualificationsLearningGoal[];
}
