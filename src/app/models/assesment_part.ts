/**
 * this model represents an entry in the assesment table in module.component.ts
 */
export interface AssesmentPart {
  subcode?: string;
  description?: string;
  // percentage is a fraction.
  percentage?: number;
  minimal_grade?: number;
  remark?: string;
}
