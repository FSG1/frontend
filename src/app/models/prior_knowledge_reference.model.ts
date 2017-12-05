import {SimpleModule} from './qualificiationfiltermodels/simple_module';

export class PriorKnowledgeReference {
  id: number;
  code: string;
  name: string;
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
