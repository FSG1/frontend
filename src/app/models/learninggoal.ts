import {StudentSkill} from './studentskill';

// The LearningGoal model represents a learning goal.
// The model also contains information about how it attributes to the HBO-I matrix.
export interface LearningGoal {
  name?: string;
  description?: string;
  // type defines if it is a group learning goal or personal learning goal
  type?: string;
  skillmatrix?: StudentSkill[];
  weight?: number;
  expanded?: boolean;
}
