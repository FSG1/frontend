import {QualificationsLearningGoal} from './qualifications_learning_goal.model';

export interface QualificationsModule {
  code: string;
  name: string;
  credits: number;
  learning_goals: QualificationsLearningGoal[];
}
