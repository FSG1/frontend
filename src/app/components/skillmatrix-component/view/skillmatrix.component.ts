import {Component, Input} from '@angular/core';
import {ArchitecturalLayer} from '../../../models/architecturallayer';
import {LifecycleActivity} from '../../../models/lifecycleactivity';
import {StudentSkill} from '../../../models/studentskill';

/**
 * This component represents the HBO-I matrix, found in multiple pages.
 */
@Component({
  selector: 'app-skill-matrix',
  templateUrl: './skillmatrix.component.html',
  styleUrls: ['./skillmatrix.component.scss']
})
export class SkillMatrixComponent {
  @Input() architecturallayers: ArchitecturalLayer[];
  @Input() lifecycleactivities: LifecycleActivity[];
  @Input() studentskills: StudentSkill[];

  /**
   * This method checks if there is a entry in the studentskill variable.
   * If there is it will return the variable.
   * @param {number} i Represents the Lifecycle activity
   * @param {number} j represents the architectural layer
   * @returns {number} HBO-I level
   */
  checkForValue(i: number, j: number): number {
    for (let x = 0; x < this.studentskills.length; x++) {
      if (i === this.studentskills[x].architectural_layer && j === this.studentskills[x].lifecycle_activity) {
        return this.studentskills[x].level;
      }
    }
    return null;
  }
}
