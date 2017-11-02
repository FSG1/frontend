import {Component, OnInit} from '@angular/core';
import {LearningGoal} from '../../models/learninggoal';
import {ActivatedRoute} from '@angular/router';
import {ModuleContent} from '../../models/modulecontent.model';
import {BackendService} from '../../backend.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  moduleContent: ModuleContent;
  selectedModule: string;
  selectedLearningGoalName: string;
  moduleCurriculum: number;
  personalGoals: LearningGoal[];
  groupGoals: LearningGoal[];

  constructor(private route: ActivatedRoute, private backendService: BackendService) {
    this.selectedLearningGoalName = '';
    this.route.params.subscribe(
     params => {
       this.selectedModule = params['code'];
       this.moduleCurriculum = params['curriculum'];
     });
  }

  ngOnInit(): void {
    this.backendService.getModuleContent(this.moduleCurriculum, this.selectedModule)
      .subscribe(moduleContent => this.contentReceive(moduleContent));
  }

  private contentReceive(data: ModuleContent) {
    const personal = [];
    const group = [];
    data.learning_goals.forEach(function(lg) {
      if (lg.type === 'group') {
        group.push(lg);
      } else {
        personal.push(lg);
      }
    });

    // Regex extract number from learning goals name
    const regex = /LG\s(\d+)/;

    // Sorts learning goals ascending according to their number
    const sortFunc = function(lg1: LearningGoal, lg2: LearningGoal): number {
      let matches = lg1.name.match(regex);
      const a = matches[1];

      matches = lg2.name.match(regex);
      const b = matches[1];

      return Number(a) - Number(b);
    };

    this.moduleContent = data;
    this.personalGoals = personal.sort(sortFunc);
    this.groupGoals = group.sort(sortFunc);
  }

  onSelect(learningGoal: LearningGoal): void {
    if (this.selectedLearningGoalName === '') {
      this.selectedLearningGoalName = learningGoal.name;
    }else if (this.selectedLearningGoalName === learningGoal.name) {
      this.selectedLearningGoalName = '';
    }else {
      this.selectedLearningGoalName = learningGoal.name;
    }
  }
}

