import {QualificationsModule} from './qualifications_module';

/**
 * This model exists because there was need of a modified module model.
 */
export interface  QualificationsOverviewSemester {
  semester: number;
  qualifications_modules: QualificationsModule[];
}
