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
  // Module code like DBS1
  code: string;
  name: string;
  credits: number;
  semesters: number[];
  lectures_in_week: number;
  practical_hours_week: number;
  introductorytext: string;
  topics: string[];
  teaching_material: TeachingMaterial[];
  // This list represents the teaching material types, like book, website etc.
  teaching_material_types: string[];
  additional_information: string;
  // all_lecturers is here because module-edit.component.ts needs a list of teachers.
  // The user can then add teachers according to this list.
  all_lecturers: Lecturer[];
  // active_lecturers represent the teachers that teach this course.
  active_lecturers: Lecturer[];
  credentials: string;
  // Project_flag represents if the module is a project or not.
  project_flag: boolean;
  prior_knowledge_references: PriorKnowledgeReference[];
  modules: SimpleModule[];
  learning_goals: LearningGoal[];
  assesment_parts: AssesmentPart[];
}
