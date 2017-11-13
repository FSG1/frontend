import {QualificationsLearningGoal} from './qualifications_learning_goal.model';

export interface QualificationsModule {
  module_code: string;
  module_name: string;
  credits: number;
  learning_goals: QualificationsLearningGoal[];
}
