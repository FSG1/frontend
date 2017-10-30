import {StudentSkill} from './studentskill';


export interface LearningGoal {
  name: string;
  description: string;
  type: string;
  skillmatrix: StudentSkill[];
  assesment_types: string[];
  weight: number;
}
