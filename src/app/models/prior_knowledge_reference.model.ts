import {Module} from './module.model';

export class PriorKnowledgeReference {
  code: string;
  name: string;
  type: string;
  remarks?: string;
  public constructor (mod: Module, type: string, remarks: string) {
    this.code = mod.code;
    this.name = mod.name;
    this.type = type;
    this.remarks = remarks;
  }
}
