import {QualificationsModule} from './qualifications_module';

export interface  QualificationsOverviewSemester {
  semester: number;
  qualifications_modules: QualificationsModule[];
}
