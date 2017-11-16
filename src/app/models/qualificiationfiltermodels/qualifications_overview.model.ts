import {QualificationsOverviewSemester} from './qualifications_overview_semester.model';

export interface QualificationsOverview {
  skills_level: number;
  qualification_overview_semesters: QualificationsOverviewSemester[];
}
