import {TeachingMaterial} from '../teaching_material';
import {Lecturer} from '../lecturer';
import {LearningGoal} from '../learninggoal';
import {AssesmentPart} from '../assesment_part';
import {PriorKnowledgeReference} from '../prior_knowledge_reference.model';
import {SimpleModule} from './simple_module';

// This model is used to fill the module-edit.component.ts component.
// The model is retrieved from the backend using getEditableModule method from backend service
export class EditableModuleOutput {
  id: number;
  code: string;
  name: string;
  credits: number;
  semesters: number[];
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
  prior_knowledge_references: PriorKnowledgeReference[];
  modules: SimpleModule[];
  learning_goals: LearningGoal[];
  assesment_parts: AssesmentPart[];
}
