// This method represents the material a student needs to have for a module.
export class TeachingMaterial {
  name: string;
  type: string;
  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}
