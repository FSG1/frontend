// This Module object represents a module with basic identification.
export interface Module {
  // Module code like DBS1
  code: string;
  name: string;
  credits: number;
  // Project_flag represents if the module is a project or not.
  is_project: boolean;
}
