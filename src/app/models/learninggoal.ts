import {StudentSkill} from './studentskill';

// The LearningGoal model represents a learning goal.
// The model also contains information about how it attributes to the HBO-I matrix.
export interface LearningGoal {
  name?: string;
  description?: string;
  type?: string;
  skillmatrix?: StudentSkill[];
  weight?: number;
  expanded?: boolean;
}
