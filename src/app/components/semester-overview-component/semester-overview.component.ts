import {AfterContentInit, Component, OnDestroy} from '@angular/core';
import {CompleteSemester} from '../../models/complete_semester.model';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../../backend.service';
import {Subscription} from 'rxjs/Subscription';

/**
 * This is the complete semester page. it displays the courses of a semester and what the skills are after the semester of the HBO-I matrix.
 */
@Component({
  selector: 'app-semester-overview',
  templateUrl: './semester-overview.component.html',
  styleUrls: ['./semester-overview.component.scss']
})
export class SemesterOverviewComponent implements AfterContentInit, OnDestroy {
  completesemester: CompleteSemester;

  curriculumid: number;
  semester: number;

  routeSubscription: Subscription;

  constructor(private backendService: BackendService, private route: ActivatedRoute) {}

  /**
   * This method gets the complete semester object from the endpoint.
   * The method uses the url params to call the endpoint.
   */
  ngAfterContentInit(): void {
    this.routeSubscription = this.route.params.subscribe(
      params => {
        this.curriculumid = params['curriculum'];
        this.semester = params['semester'];
        this.backendService.getSemester(this.curriculumid, this.semester)
          .subscribe(completesemester => this.completesemester = completesemester);
      });
  }
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
