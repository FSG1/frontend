import {TeachingMaterial} from '../teaching_material';
import {Lecturer} from '../lecturer';
import {LearningGoal} from '../learninggoal';
import {AssesmentPart} from '../assesment_part';
import {PriorKnowledgeReferenceModel} from '../prior_knowledge_reference.model';

export interface EditableModuleOutput {
  id: number;
  code: string;
  name: string;
  credits: number;
  semester: number;
  lectures_in_week: number;
  practical_hours_week: number;
  introductorytext: string;
  topics: string[];
  teaching_material: TeachingMaterial[];
  teaching_material_types: string[];
  additional_information: string;
  all_lecturers: Lecturer[];
  active_lecturers: Lecturer[];
  credentials: string;
  project_flag: boolean;
  learning_goals: LearningGoal[];
  assesment_parts: AssesmentPart[];
  prior_knowledge_references: PriorKnowledgeReferenceModel[];
}
