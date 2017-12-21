import {TeachingMaterial} from '../teaching_material';
import {EditableModuleOutput} from './editable_module_output';
import {LearningGoal} from '../learninggoal';
import {AssesmentPart} from '../assesment_part';
import {PriorKnowledgeReference} from '../prior_knowledge_reference.model';

// This model is used for posting an edited module to the backed.
// This model is used in module-edit.component.ts
// The backend service method used to post this model is updateEditableModule
export class EditableModuleInput {
  id: number;
  code: string;
  name: string;
  credits: number;
  lectures_in_week: number;
  practical_hours_week: number;
  introductorytext: string;
  topics: string[];
  teaching_material: TeachingMaterial[];
  additional_information: string;
  lecturers: number[];
  credentials: string;
  project_flag: boolean;
  learning_goals: LearningGoal[];
  assesment_parts: AssesmentPart[];
  prior_knowledge_references: PriorKnowledgeReference[];
  public constructor(output: EditableModuleOutput) {
    this.id = output.id;
    this.code = output.code.toUpperCase();
    this.name = output.name;
    this.credits = output.credits;
    this.lectures_in_week = output.lectures_in_week;
    this.practical_hours_week = output.practical_hours_week;
    this.introductorytext = output.introductorytext;
    this.topics = output.topics;
    this.teaching_material = output.teaching_material;
    this.additional_information = output.additional_information;
    this.credentials = output.credentials;
    this.project_flag = output.project_flag;
    this.prior_knowledge_references = output.prior_knowledge_references;
    this.learning_goals = output.learning_goals;
    this.assesment_parts = output.assesment_parts;
    this.prior_knowledge_references = output.prior_knowledge_references;

    // Giving meaning to a empty object
    this.lecturers = new Array();
    for (let i = 0; i < output.active_lecturers.length; i++) {
      this.lecturers[i] = output.active_lecturers[i].id;
    }
  }
}
