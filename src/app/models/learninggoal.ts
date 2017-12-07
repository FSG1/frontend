import {StudentSkill} from './studentskill';

export class LearningGoal {
  name: string;
  description: string;
  type: string;
  skillmatrix: StudentSkill[];
  weight: number;
  expanded?: boolean;
}
