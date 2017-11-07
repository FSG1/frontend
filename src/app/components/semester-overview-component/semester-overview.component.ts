import {AfterContentInit, Component, OnDestroy} from '@angular/core';
import {CompleteSemester} from '../../models/complete_semester.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../backend.service';
import {Subscription} from 'rxjs/Subscription';
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Observable';

const mocksemester = {
  'semester': 1,
  'modules': [
    {'module_code': 'JAV1',        'module_name': 'Programming in Java 1',       'credits': 5 },
    {'module_code': 'DBS1',         'module_name': 'Databases',       'credits': 5 },
    {'module_code': 'BUA',         'module_name': 'Business Administration',       'credits': 4 },
    {'module_code': 'MAT1',        'module_name': 'Mathematics 1',       'credits': 4 },
    {'module_code': 'ENG1',        'module_name': 'English 1',       'credits': 1 },
    {'module_code': 'PRJ1',        'module_name': 'Project 1',       'credits': 10 },
    {'module_code': 'COM1',        'module_name': 'Communication 1',       'credits': 2 }
  ],
  'qualifications': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
    {'lifecycle_activity': 2, 'architectural_layer': 3, 'level': 2}],
  'architectural_layers': [{'architectural_layer_id': 0, 'architectural_layer_name': 'User Interaction', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 1, 'architectural_layer_name': 'Business Processes', 'Architectural_layer_description': 'something'},
    {'architectural_layer_id': 2, 'architectural_layer_name': 'Infrastructure', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 3, 'architectural_layer_name': 'software', 'architectural_layer_description': 'something'}],
  'lifecycle_activities': [{'lifecycle_activity_id': 0, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 1, 'lifecycle_activity_name': 'Analyze', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 2, 'lifecycle_activity_name': 'Advice', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 3, 'lifecycle_activity_name': 'Design', 'lifecycle_activity_description': 'something'}]
};



@Component({
  selector: 'app-semester-overview',
  templateUrl: './semester-overview.component.html',
  styleUrls: ['./semester-overview.component.scss']
})
export class SemesterOverviewComponent implements AfterContentInit, OnDestroy {
  completesemester: CompleteSemester;
  curriculumname: string;
  curriculumid: number;
  semester: number;

  routeSubscription: Subscription;

  constructor(private backendService: BackendService, private router: Router, private route: ActivatedRoute) {}

  ngAfterContentInit(): void {
    this.routeSubscription = this.route.params.subscribe(
      params => {
        this.curriculumname = params['name'];
        this.curriculumid = params['curriculum'];
        this.semester = params['semester'];
        this.completesemester = mocksemester as CompleteSemester;
/*        this.backendService.getSemester(this.curriculumid, this.semester)
          .subscribe(completesemester => this.completesemester = completesemester);
      });*/
    });
  }
  onClick(module_code: string): void {
    this.router.navigate(['/curriculum/', this.curriculumid, 'modules', module_code]);
  }
  ngOnDestroy(): void {
  }

}
