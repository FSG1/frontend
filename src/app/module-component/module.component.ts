import {Component} from '@angular/core';
import {LearningGoal} from "../models/learninggoal";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
})
export class ModuleComponent {
  onSelect(learninggoal: LearningGoal): void {

  }
}
