import {LearningGoal} from './learninggoal';
import {ArchitecturalLayer} from './architecturallayer';
import {LifecycleActivity} from './lifecycleactivity';
import {StudentSkill} from './studentskill';
import {PriorKnowledgeReference} from './prior_knowledge_reference.model';
import {AssesmentPart} from './assesment_part';

/**
 * This model is used in model.component.ts and is returned by the getModuleContent method of backend.service.ts
 * This model represents a complete module.
 */
export interface ModuleContent {
  // Module code like DBS1
  code: string;
  name: string;
  credits: number;
  semester: number;
  lectures_in_week: number;
  practical_hours_week: number;
  total_effort: number;
  lecturers: string[];
  credentials: string;
  introductorytext: string;
  qualifications: StudentSkill[];
  topics: string[];
  teaching_material: string[];
  prior_knowledge_references: PriorKnowledgeReference[];
  additional_information: string;
  architectural_layers: ArchitecturalLayer[];
  lifecycle_activities: LifecycleActivity[];
  learning_goals: LearningGoal[];
  assesment_parts: AssesmentPart[];
}
