import {TeachingMaterial} from '../teaching_material';

export interface EditableModuleInput {
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
}
