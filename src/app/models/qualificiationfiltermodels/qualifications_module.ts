import {QualificationsLearningGoal} from './qualifications_learning_goal.model';

// This module exists because contentmodule has too many fields that won't be filled and learning goals are a necessity.
export interface QualificationsModule {
  code: string;
  name: string;
  credits: number;
  learning_goals: QualificationsLearningGoal[];
}
