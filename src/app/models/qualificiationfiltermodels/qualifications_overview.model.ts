import {QualificationsOverviewSemester} from './qualifications_overview_semester.model';

// This model is a skill level in the qualifications-overview.component.ts
export interface QualificationsOverview {
  skills_level: number;
  qualifications_overview_semesters: QualificationsOverviewSemester[];
}
