import {TeachingMaterial} from '../teaching_material';
import {Lecturer} from '../lecturer';
import {PriorKnowledgeReference} from '../prior_knowledge_reference.model';
import {SimpleModule} from '../qualificiationfiltermodels/simple_module';

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
}
