import {TeachingMaterial} from '../teaching_material';
import {EditableModuleOutput} from './editable_module_output';

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
    this.lecturers = new Array();
    for (let i = 0; i < output.active_lecturers.length; i++) {
      this.lecturers[i] = output.active_lecturers[i].id;
    }
  }
}
