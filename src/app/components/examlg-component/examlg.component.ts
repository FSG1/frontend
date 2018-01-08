import {Component, Input, OnInit} from '@angular/core';

import {LearningGoal} from '../../models/learninggoal';

/**
 * This component was used at a certain point to display the exam requirements per learning goal.
 * The customer might want to use this component again in the future
 */
@Component({
  selector: 'app-exam-lg',
  templateUrl: './examlg.component.html',
  styleUrls: ['./examlg.component.scss']
})
export class ExamLGComponent {
  @Input() lg: LearningGoal;
}
