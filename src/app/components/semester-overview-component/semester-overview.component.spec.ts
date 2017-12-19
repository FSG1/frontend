import {SemesterOverviewComponent} from './semester-overview.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {ModuleContent} from '../../models/modulecontent.model';
import {Subscriber} from 'rxjs/Subscriber';
import {ModuleOverviewComponent} from '../module-overview-component/module-overview.component';
import {SkillMatrixComponent} from '../skillmatrix-component/view/skillmatrix.component';
import {ModuleComponent} from '../module-component/view/module.component';
import {BackendService} from '../../backend.service';
import {ActivatedRoute} from '@angular/router';
import {AppRoutingModule} from '../../app.routing';
import {APP_BASE_HREF} from '@angular/common';
import {ErrorComponent} from '../../../util/error/error.component';
import {ExamLGComponent} from '../examlg-component/examlg.component';
import {By} from '@angular/platform-browser';
import {QualificationOverviewComponent} from '../qualification-overview-component/qualification-overview.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

const mocksemester = {
  'curriculum_name': 'Business Informatics',
  'modules': [
    {'module_code': 'JAV1',        'module_name': 'Programming in Java 1',       'credits': 5 },
    {'module_code': 'DBS1',         'module_name': 'Databases',       'credits': 5 },
    {'module_code': 'BUA',         'module_name': 'Business Administration',       'credits': 4 },
    {'module_code': 'MAT1',        'module_name': 'Mathematics 1',       'credits': 4 },
    {'module_code': 'ENG1',        'module_name': 'English 1',       'credits': 1 },
    {'module_code': 'PRJ1',        'module_name': 'Project 1',       'credits': 10 },
    {'module_code': 'COM1',        'module_name': 'Communication 1',       'credits': 2 }
  ],
  'qualifications': [
    {'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
    {'lifecycle_activity': 2, 'architectural_layer': 3, 'level': 2}
  ],
  'architectural_layers': [
    {'architectural_layer_id': 0, 'architectural_layer_name': 'User Interaction', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 1, 'architectural_layer_name': 'Business Processes', 'Architectural_layer_description': 'something'},
    {'architectural_layer_id': 2, 'architectural_layer_name': 'Infrastructure', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 3, 'architectural_layer_name': 'software', 'architectural_layer_description': 'something'}
  ],
  'lifecycle_activities': [
    {'lifecycle_activity_id': 0, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 1, 'lifecycle_activity_name': 'Analyze', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 2, 'lifecycle_activity_name': 'Advice', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 3, 'lifecycle_activity_name': 'Design', 'lifecycle_activity_description': 'something'}
  ]
};

describe('Testing semester overview component', () => {
  let component: SemesterOverviewComponent;
  let fixture: ComponentFixture<SemesterOverviewComponent>;
  let backendService;
  const backendServiceStub = {
    getSemester(curriculum: number, semester: number): Observable<ModuleContent[]> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(mocksemester);
        observer.complete();
      });
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SemesterOverviewComponent
      ],
      providers: [
        {provide: BackendService, useValue: backendServiceStub},
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{'curriculum': 1, 'semester': 4 }]) } },
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterOverviewComponent);
    component = fixture.componentInstance;
    backendService = fixture.debugElement.injector.get(BackendService);
    fixture.detectChanges();
  });

  it('Should assign its route parameters', () => {
    expect(component.semester).toBe(4);
    expect(component.curriculumid).toBe(1);
  });
  it('Should load 7 modules.', () => {
    expect(fixture.debugElement.queryAll(By.css('.test-amount-modules')).length).toBe(7);
  });
  it('should have a title of: some name semester 4', () => {
    expect(fixture.debugElement.query(By.css('.test-title')).nativeElement.innerText).toBe('Business Informatics - Semester 4');
  });
// test-amount-modules
});
