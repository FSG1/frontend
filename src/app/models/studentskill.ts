// the studentskill model is a model which represents one entry in the skillmatrix table.
// It represents the skill a student should have after following course/semester/curriculum X of the HBO-I matrix
export interface StudentSkill {
  lifecycle_activity: number;
  architectural_layer: number;
  level: number;
}
