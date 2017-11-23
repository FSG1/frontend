import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {QualificationOverviewComponent} from './qualification-overview.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterQualifications} from '../../models/qualificiationfiltermodels/filter_qualifications.model';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import {QualificationsOverview} from '../../models/qualificiationfiltermodels/qualifications_overview.model';
import {ModuleOverviewComponent} from '../module-overview-component/module-overview.component';
import {ErrorComponent} from '../../../util/error/error.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AppRoutingModule} from '../../app.routing';
import {ModuleComponent} from '../module-component/view/module.component';
import {SemesterOverviewComponent} from '../semester-overview-component/semester-overview.component';
import {SkillMatrixComponent} from '../skillmatrix-component/skillmatrix.component';
import {ExamLGComponent} from '../examlg-component/examlg.component';
import {APP_BASE_HREF} from '@angular/common';
import {BackendService} from '../../backend.service';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

const filterqualifications = {
  'curricula': [
    { 'name': 'Software Engineering', 'code': 'SE', 'id': 1},
    { 'name': 'Business Informatics', 'code': 'BI', 'id': 2}],
  'lifecycle_activities': [{'lifecycle_activity_id': 0, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 1, 'lifecycle_activity_name': 'Analyze', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 2, 'lifecycle_activity_name': 'Advice', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 3, 'lifecycle_activity_name': 'Design', 'lifecycle_activity_description': 'something'}],
  'architectural_layers': [{'architectural_layer_id': 0, 'architectural_layer_name': 'User Interaction', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 1, 'architectural_layer_name': 'Business Processes', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 2, 'architectural_layer_name': 'Infrastructure', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 3, 'architectural_layer_name': 'software', 'architectural_layer_description': 'something'}],
};
const mockqualificationtable = [{
  'skills_level': 1,
  'qualifications_overview_semesters': [
    {'semester': 1,
      'qualifications_modules': [
        {
          'module_code': 'BUA',
          'module_name': 'Business informatics',
          'credits': 4,
          'learning_goals': [
            {
              'name': 'lg1',
              'description': 'loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsumloremIpsum loremIpsumloremIpsumloremIpsum loremIpsumloremIpsumlorem IpsumloremIpsum loremIpsumloremIpsumloremIpsum'
            }, {
              'name': 'lg2',
              'description': 'blablabla'
            }]
        }, {
          'module_code': 'JAV1',
          'module_name': 'Java 1',
          'credits': 5,
          'learning_goals': [
            {
              'name': 'lg3',
              'description': 'heel mooi'
            }, {
              'name': 'lg4',
              'description': 'blablabla'
            }, {
              'name': 'lg5',
              'description': 'blablabla'
            }]
        }, {
          'module_code': 'DBS',
          'module_name': 'Databases',
          'credits': 5,
          'learning_goals': [
            {
              'name': 'lg6',
              'description': 'blablabla'
            }]
        }]
    },
    {'semester': 3,
      'qualifications_modules': [
        {
          'module_code': 'BUMA',
          'module_name': 'Business management',
          'credits': 5,
          'learning_goals': [
            {
              'name': 'lg7',
              'description': 'blablabla'
            }, {
              'name': 'lg8',
              'description': 'blablabla'
            }, {
              'name': 'lg9',
              'description': 'blablabla'
            }]
        }, {
          'module_code': 'COM3',
          'module_name': 'Communicatie 3',
          'credits': 1,
          'learning_goals': [
            {
              'name': 'lg10',
              'description': 'blablabla'
            }, {
              'name': 'lg11',
              'description': 'blablabla'
            }]
        }]},
    {'semester': 7,
      'qualifications_modules': [{
        'module_code': 'SOFA',
        'module_name': 'Software factorio',
        'credits': 15,
        'learning_goals': [
          {
            'name': 'lg4',
            'description': 'blablabla'
          }]
      }]
    }]},  {
  'skills_level': 2,
  'qualifications_overview_semesters': [
    {'semester': 2,
      'qualifications_modules': [
        {
          'module_code': 'etc',
          'module_name': 'etc',
          'credits': 15,
          'learning_goals': [
            {
              'name': 'lg4',
              'description': 'blablabla'
            }, {
              'name': 'lg5',
              'description': 'blablabla'
            }, {
              'name': 'lg6',
              'description': 'blablabla'
            }]
        }]
    },
    {'semester': 4,
      'qualifications_modules': [{
        'module_code': 'etc2',
        'module_name': 'etc',
        'credits': 1,
        'learning_goals': [
          {
            'name': 'lg4',
            'description': 'blablabla'
          }, {
            'name': 'lg5',
            'description': 'blablabla'
          }, {
            'name': 'lg6',
            'description': 'blablabla'
          }]
      }
      ]}]
}];

describe('Testing Qualification overview component after initialization', () => {
  let component: QualificationOverviewComponent;
  let fixture: ComponentFixture<QualificationOverviewComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let backendService;

  const backendServiceStub = {
    getQualifications(): Observable<FilterQualifications> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(filterqualifications);
        observer.complete();
      });
    },
    getQualificationTable(curriculum: number, architecturallayer: number, activity: number): Observable<QualificationsOverview[]> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(mockqualificationtable);
        observer.complete();
      });
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualificationOverviewComponent  ],
      providers: [ {provide: BackendService, useValue: backendServiceStub} ,
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'curriculum': 1, 'lifecycle_activity': 1, 'architectural_layer': 1 }]) } },
        { provide: APP_BASE_HREF, useValue: '/'}],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule.withRoutes([]) ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendService = fixture.debugElement.injector.get(BackendService);
    de = fixture.debugElement;
    const curriculumdummy = { 'name': 'Software Engineering', 'code': 'SE', 'id': 1};
    const lifecycledummy = {'lifecycle_activity_id': 0, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'};
    const architecturaldummy = {'architectural_layer_id': 1, 'architectural_layer_name': 'Business Processes', 'architectural_layer_description': 'something'};

    fixture.detectChanges();
  });
  it('filter buttons should change their name if a selection is made', () => {
  });
  it('testing if the size of the table is correctly loaded', () => {
  });
  it('testing skill level part', () => {
  });
  it('testing semester part', () => {
  });
  it('testing module part', () => {
  });
  it('testing lg part', () => {
  });
});

describe('Testing Qualification overview component before initialization', () => {
  let component: QualificationOverviewComponent;
  let fixture: ComponentFixture<QualificationOverviewComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let backendService;
  const curriculumdummy = { 'name': 'Software Engineering', 'code': 'SE', 'id': 1};
  const lifecycledummy = {'lifecycle_activity_id': 0, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'};
  const architecturaldummy = {'architectural_layer_id': 1, 'architectural_layer_name': 'Business Processes', 'architectural_layer_description': 'something'};

  const backendServiceStub = {
    getQualifications(): Observable<FilterQualifications> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(filterqualifications);
        observer.complete();
      });
    },
    getQualificationTable(curriculum: number, architecturallayer: number, activity: number): Observable<QualificationsOverview[]> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(mockqualificationtable);
        observer.complete();
      });
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleComponent, ExamLGComponent, SkillMatrixComponent, ModuleOverviewComponent, ErrorComponent, SemesterOverviewComponent, QualificationOverviewComponent  ],
      providers: [ {provide: BackendService, useValue: backendServiceStub} ,
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 1 }]) } }, {provide: APP_BASE_HREF, useValue: '/'}],
      imports: [
        AppRoutingModule
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendService = fixture.debugElement.injector.get(BackendService);
    de = fixture.debugElement;
    fixture.detectChanges();
  });
  it('Tablesize should not be undefined', () => {
  });
  it('component should not load if not all buttons are pressed', () => {

  });
});
