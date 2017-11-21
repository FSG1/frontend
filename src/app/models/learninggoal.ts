import {StudentSkill} from './studentskill';

export interface LearningGoal {
  name: string;
  description: string;
  type: string;
  skillmatrix: StudentSkill[];
  expanded?: boolean;
}
