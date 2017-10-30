import {Component, Input, OnInit} from '@angular/core';

import {LearningGoal} from '../../models/learninggoal';

@Component({
  selector: 'app-exam-lg',
  templateUrl: './examlg.component.html',
  styleUrls: ['./examlg.component.scss']
})
export class ExamLGComponent {
  @Input() lg: LearningGoal;

  fractureToPercentage(fracture: number): number {
    return (fracture * 100);
  }
}
