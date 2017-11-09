import {AfterContentInit, Component, OnDestroy} from '@angular/core';
import {CompleteSemester} from '../../models/complete_semester.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../backend.service';
import {Subscription} from 'rxjs/Subscription';
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Observable';

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

  constructor(private backendService: BackendService, private router: Router, private route: ActivatedRoute) {}

  ngAfterContentInit(): void {
    this.routeSubscription = this.route.params.subscribe(
      params => {
        this.curriculumid = params['curriculum'];
        this.semester = params['semester'];
        this.backendService.getSemester(this.curriculumid, this.semester)
          .subscribe(completesemester => this.completesemester = completesemester);
      });
  }
  onClick(module_code: string): void {
    this.router.navigate(['/curriculum/', this.curriculumid, 'modules', module_code]);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
