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

  constructor(private route: ActivatedRoute, private backendService: BackendService) {
    this.selectedLearningGoalName = '';
    this.route.params.subscribe(
     params => {
       this.selectedModule = params['code'];
       this.moduleCurriculum = params['curriculum'];
     });
  }

  ngOnInit(): void {
    this.backendService.getModuleContent(this.moduleCurriculum, this.selectedModule).subscribe(moduleContent => this.moduleContent = moduleContent);
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

