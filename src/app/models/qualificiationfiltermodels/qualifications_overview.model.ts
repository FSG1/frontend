import {QualificationsOverviewSemester} from './qualifications_overview_semester.model';

export interface QualificationsOverview {
  skills_level: number;
  qualifications_overview_semesters: QualificationsOverviewSemester[];
}
