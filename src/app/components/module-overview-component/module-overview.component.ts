import {Component, OnDestroy, OnInit} from '@angular/core';
import {Semester} from '../../models/semester.model';
import {BackendService} from '../../backend.service';
import {Curriculum} from '../../models/curriculum.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss'],
})
export class ModuleOverviewComponent implements OnInit, OnDestroy {
  semesters: Semester[];
  curricula: Curriculum[];

  // variables that get selected from the HTML
  selectedCurriculum: Curriculum;
  selectedCurriculumName: string;

  routeSubscription: Subscription;
  selectedCurriculumId: number = -1;

  constructor(private backendService: BackendService, private route: ActivatedRoute) {
    this.curricula = [];
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  /**
   * This method gets the semesters of selected curriculum from the dropdown menu from the backend.
   * @param {number} curriculumId
   */
  getSemesters(curriculumId: number): void {
      this.backendService.getSemesters(curriculumId)
        .subscribe(semesters => this.semesters = semesters);
  }

  /**
   * This method gets the values(curricula) for the filter from the backend
   */
  getCurriculum(): void {
    this.backendService.getCurricula()
      .subscribe(curricula => {
        this.curricula = curricula;

        if (this.selectedCurriculumId > 0) {
          curricula.forEach(cur => {
            if (cur.id == this.selectedCurriculumId) {
              this.selectedCurriculum = cur;
              this.selectedCurriculumName = cur.name;
              this.getSemesters(this.selectedCurriculumId);
            }
          });
        }
      });
  }

  /**
   * If there are params the init method will load the page with the previously selected filter
   */
  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params && params['curriculum']) {
        const curriculum = params['curriculum'];
        if (curriculum !== null && curriculum > 0) {
          this.selectedCurriculumId = curriculum;
        }
      }
      this.getCurriculum();
    });
  }

}
