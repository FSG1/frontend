import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ModuleEditComponent} from './module-edit.component';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EditableModuleOutput} from '../../../models/editmodels/editable_module_output';
import {Subscriber} from 'rxjs/Subscriber';
import {EditableModuleInput} from '../../../models/editmodels/editable_module_input';
import {BackendService} from '../../../backend.service';
import {ActivatedRoute} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

const outputmockup = {
  'code': 'DBS',
  'name': 'Databases',
  'credits': 5,
  'semester': 1,
  'lectures_in_week': 3,
  'practical_hours_week': 4,
  'introductorytext': 'very nice module. everyone should follow it',
  'topics': ['drinking beer', 'sql injection', 'otherstuff'],
  'teaching_material': [{
    'name': 'dbs book',
    'type': 'book'
  }, {
    'name': 'dbs book 2',
    'type': 'book'
  }, {
    'name': 'www.something.com',
    'type': 'website'
  }],
  'teaching_material_types': ['book', 'website', 'physical'],
  'additional_information': 'vey nice course',
  'all_lecturers': [{
    'id': 1,
    'name': 'Dorssers, T',
  }, {
    'id': 2,
    'name': 'Van Odenhoven, F',
  }, {
    'id': 5,
    'name': 'Van der Ham, R',
  }],
  'active_lecturers': [{
    'id': 1,
    'name': 'Dorssers, T',
  }, {
    'id': 2,
    'name': 'Van Odenhoven, F',
  }],
  'credentials': 'vey nice course'
};

describe('Testing module edit component', () => {
  //#region variables
  let component: ModuleEditComponent;
  let fixture: ComponentFixture<ModuleEditComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let backendService;
  const backendServiceStub = {
    getEditableModule(modulecode: string): Observable<EditableModuleOutput> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(outputmockup);
        observer.complete();
      });
    },
    updateEditableModule(modulecode: string, input: EditableModuleInput): void {}
  };
  //#endregion
  //#region beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleEditComponent  ],
      providers: [ {provide: BackendService, useValue: backendServiceStub} ,
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'module_code': 'DBS1'}]) } },
        { provide: APP_BASE_HREF, useValue: '/'}],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule.withRoutes([]) ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendService = fixture.debugElement.injector.get(BackendService);
    de = fixture.debugElement;
    fixture.detectChanges();
  });
  //#endregion
  it('testing setup of tests', () => {
    expect(true).toBe(true);
  });
});
