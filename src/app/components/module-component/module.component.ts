///<reference path="../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnDestroy, OnInit} from '@angular/core';
import {LearningGoal} from '../../models/learninggoal';
import {ActivatedRoute} from '@angular/router';
import {ModuleContent} from '../../models/modulecontent.model';
import {BackendService} from '../../backend.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit, OnDestroy{
  moduleContent: ModuleContent;
  selectedModule: string;
  moduleCurriculum: number;
  personalGoals: LearningGoal[] = [];
  groupGoals: LearningGoal[] = [];

  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(
      params => {
        this.selectedModule = params['code'];
        this.moduleCurriculum = params['curriculum'];

        this.backendService.getModuleContent(this.moduleCurriculum, this.selectedModule)
          .subscribe(moduleContent => this.contentReceive(moduleContent));
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  private contentReceive(data: ModuleContent) {
    const personal = [];
    const group = [];
    data.learning_goals.forEach(function(lg) {
      lg.expanded = false;
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
    if (learningGoal.expanded == null) {
      learningGoal.expanded = false;
    }

    learningGoal.expanded = !learningGoal.expanded;
  }
}

