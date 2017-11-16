import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ModuleComponent} from './module.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import {ModuleContent} from '../../models/modulecontent.model';
import {Subscriber} from 'rxjs/Subscriber';
import {BackendService} from '../../backend.service';
import {By} from '@angular/platform-browser';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ExamLGComponent} from '../examlg-component/examlg.component';
import {SkillMatrixComponent} from '../skillmatrix-component/skillmatrix.component';
import {APP_BASE_HREF, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from '../../app.routing';
import {ModuleOverviewComponent} from '../module-overview-component/module-overview.component';
import {ErrorComponent} from '../../../util/error/error.component';
import {SemesterOverviewComponent} from '../semester-overview-component/semester-overview.component';
import {QualificationOverviewComponent} from '../qualification-overview-component/qualification-overview.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';


const modulemodel = {
  'module_code': 'IOT',
  'module_name': 'Internet of Things',
  'credits': 5,
  'semester': 7,
  'lectures_in_week': 2,
  'practical_hours_week': 2,
  'total_effort': 60,
  'lecturers': ['Thijs Dorssers'],
  'credentials': 'bla bla',
  'introductorytext': 'bla IOT',
  'qualifications': [],
  'topics': ['bla1', 'bla2'],
  'teaching_material': 'brain',
  'prior_knowledge_references': [{'module_code': 1, 'module_name': 'JAVA!', 'type': 'strict', 'remark': 'nothing'}],
  'additional_information': 'nothing',
  'architectural_layers': [{'architectural_layer_id': 0, 'architectural_layer_name': 'User Interaction', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 1, 'architectural_layer_name': 'Business Processes', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 2, 'architectural_layer_name': 'Infrastructure', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 3, 'architectural_layer_name': 'software', 'architectural_layer_description': 'something'}],
  'lifecycle_activities': [{'lifecycle_activity_id': 0, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 1, 'lifecycle_activity_name': 'Analyze', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 2, 'lifecycle_activity_name': 'Advice', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 3, 'lifecycle_activity_name': 'Design', 'lifecycle_activity_description': 'something'}],
  'learning_goals':  [
    {
      'name': 'LG 1',
      'description': 'apply control structures, function invocation and memory management in C ',
      'type': 'personal',
      'skillmatrix': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
        {'lifecycle_activity': 2, 'architectural_layer': 3, 'level': 1}],
      'assesment_types': null,
      'weight': null
    },
    {
      'name': 'LG 2',
      'description': 'apply object orientation and memory management in C++ managed and unmanaged',
      'type': 'personal',
      'skillmatrix': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1}],
      'assesment_types': null,
      'weight': null
    },
    {
      'name': 'LG 3',
      'description': 'apply C++11 and C++14 extensions of C++',
      'type': 'personal',
      'skillmatrix': [{'lifecycle_activity': 3, 'architectural_layer': 1, 'level': 2}],
      'assesment_types': null,
      'weight': null
    },
    {
      'name': 'LG 4',
      'description': 'do group stuff',
      'type': 'group',
      'skillmatrix': [{'lifecycle_activity': 0, 'architectural_layer': 0, 'level': 3}],
      'assesment_types': null,
      'weight': null
    }
  ]
};

describe('Testing module component', () => {
  let component: ModuleComponent;
  let fixture: ComponentFixture<ModuleComponent>;
  let backendService;
  const backendServiceStub = {
    getModuleContent(curriculum: number, code: string): Observable<ModuleContent[]> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(modulemodel);
        observer.complete();
      });
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleComponent, ExamLGComponent, SkillMatrixComponent],
      providers: [ {provide: BackendService, useValue: backendServiceStub} ,
               { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 1 }]) } }, {provide: APP_BASE_HREF, useValue: '/'}],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ModuleComponent);
    component = fixture.componentInstance;
    backendService = fixture.debugElement.injector.get(BackendService);
    fixture.detectChanges();
  });

    it('Should be three personal learning goals', () => {
      component.moduleContent = modulemodel;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.personal-goal')).length).toBe(3);
    });
    it('Should be one group learning goal', () => {
      component.moduleContent = modulemodel;
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.group-goal')).length).toBe(1);
    });
});

