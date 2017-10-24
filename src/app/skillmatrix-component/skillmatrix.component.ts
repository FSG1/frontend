import {Component, Input, OnInit} from '@angular/core';
import {LearningGoal} from '../models/learninggoal';
import {ArchitecturalLayer} from '../models/architecturallayer';
import {LifecycleActivity} from '../models/lifecycleactivity';
import {StudentSkill} from '../models/studentskill';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-skill-matrix',
  templateUrl: './skillmatrix.component.html',
  styleUrls: ['./skillmatrix.component.scss']
})
export class SkillMatrixComponent {
  @Input() architecturallayers: ArchitecturalLayer[];
  @Input() lifecycleactivities: LifecycleActivity[];
  @Input() studentskills: StudentSkill[];

  checkForValue(i: number, j: number): number {
    for (let x = 0; x < this.studentskills.length; x++) {
      if (i === this.studentskills[x].architectural_layer && j === this.studentskills[x].lifecycle_activity) {
        return this.studentskills[x].level;
      }
    }
    return null;
  }
}
