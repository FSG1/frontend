import {SimpleModule} from './editmodels/simple_module';

/**
 * This model represents a prerequisite module of a module.
 * Example: java one is a prerequisite of java two.
 */
export class PriorKnowledgeReference {
  id: number;
  // Module code like DBS1
  code: string;
  name: string;
  // type can be concurrent, prior or mandatory
  type: string;
  remarks: string;
  public constructor (mod: SimpleModule, type: string, remarks: string) {
    this.id = mod.id;
    this.code = mod.code;
    this.name = mod.name;
    this.type = type;
    this.remarks = remarks;
  }
}
