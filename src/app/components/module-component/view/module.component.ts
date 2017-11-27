///<reference path="../../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnDestroy, OnInit} from '@angular/core';
import {LearningGoal} from '../../../models/learninggoal';
import {ActivatedRoute} from '@angular/router';
import {ModuleContent} from '../../../models/modulecontent.model';
import {BackendService} from '../../../backend.service';
import {Subscription} from 'rxjs/Subscription';
import {AssesmentPart} from '../../../models/assesment_part';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit, OnDestroy {
  moduleContent: ModuleContent;
  selectedModule: string;
  moduleCurriculum: number;
  personalGoals: LearningGoal[] = [];
  groupGoals: LearningGoal[] = [];
  numberRemarks: number;

  routeSubscription: Subscription;

  constructor(private backendService: BackendService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.moduleContent = null;
    this.selectedModule = null;
    this.moduleCurriculum = null;
    this.routeSubscription = this.route.params.subscribe(
      params => {
        this.moduleContent = null;
        this.selectedModule = params['code'];
        this.moduleCurriculum = params['curriculum'];

        this.backendService.getModuleContent(this.moduleCurriculum, this.selectedModule)
          .subscribe(moduleContent => {
            this.contentReceive(moduleContent);
            this.moduleContent.assesment_parts.forEach( part => {
              if (part.remark.length > 0) {
                this.numberRemarks++;
              }
            });
          });
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  private contentReceive(data: ModuleContent) {
    const personal = [];
    const group = [];
    if (data.learning_goals === null) {
      data.learning_goals = [];
    }

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
