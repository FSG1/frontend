import {Component} from '@angular/core';
import {Module} from '../../models/module.model';

@Component ({
  selector: 'app-learning-goals-overview',
  templateUrl: './learningGoalsOverview.component.html',
  styleUrls: ['./learningGoalsOverview.component.scss']
})
export class LearningGoalsOverviewComponent {
  module: Module;

  constructor() {
    return null;
  }
}

