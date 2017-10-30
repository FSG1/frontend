import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleOverviewComponent } from './module-overview.component';
import {BackendService} from '../../backend.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {Semester} from '../../models/semester.model';
import {Curriculum} from '../../models/curriculum.model';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import {Router} from '@angular/router';

const curricula = [
  { 'name': 'Software Engineering', 'code': 'SE', 'id': 1},
  { 'name': 'Business Informatics', 'code': 'BI', 'id': 2},
];
const semesters = [
  { 'semester': 1,
    'modules': [
      {'module_code': 'JAV1',        'module_name': 'Programming in Java 1',       'credits': 5 },
      {'module_code': 'DBS',         'module_name': 'Databases',       'credits': 5 },
      {'module_code': 'BUA',         'module_name': 'Business Administration',       'credits': 4 },
      {'module_code': 'MAT1',        'module_name': 'Mathematics 1',       'credits': 4 },
      {'module_code': 'ENG1',        'module_name': 'English 1',       'credits': 1 },
      {'module_code': 'PRJ1',        'module_name': 'Project 1',       'credits': 10 },
      {'module_code': 'COM1',        'module_name': 'Communication 1',       'credits': 2 }
    ]},
  {'semester': 2,
    'modules': [
      {'module_code': 'JAV2',        'module_name': 'Programming in Java 2',       'credits': 5 },
      {'module_code': 'MOD1',        'module_name': 'Modeling Techniques 1',       'credits': 1 },
      {'module_code': 'SEN1',        'module_name': 'Software Engineering 1',       'credits': 3 },
      {'module_code': 'BUMA',        'module_name': 'Business Management',       'credits': 3 },
      {'module_code': 'ITSM',        'module_name': 'IT Service management',       'credits': 5 },
      {'module_code': 'PRJ2',        'module_name': 'Project 2',       'credits': 10 },
      {'module_code': 'COM2',        'module_name': 'Communication 2',       'credits': 1 }
    ]}
];

describe('ModuleOverviewComponent', () => {
  let component: ModuleOverviewComponent;
  let fixture: ComponentFixture<ModuleOverviewComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let backendService;
  const backendServiceStube = {
    getCurricula(): Observable<Curriculum[]> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(curricula);
        observer.complete();
      });
    },
    getSemesters(id: number): Observable<Semester[]> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(semesters);
        observer.complete();
      });
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleOverviewComponent ],
      providers: [ {provide: BackendService, useValue: backendServiceStube},
                   {provide: Router }]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendService = fixture.debugElement.injector.get(BackendService);
    de = fixture.debugElement;
  });

  it('Dropdown menu should have 2 items SE and BI', () => {
    fixture.detectChanges();
    // checking the innertext
    expect(de.queryAll(By.css('.dropdown-item')).length).toBe(2) ;
  });
  it('After selecting dropdown item, semester 1 should be displayed', () => {
    fixture.detectChanges();
    const curriculum = { 'name': 'Software Engineering', 'code': 'SE', 'id': 1};
    component.onSelect(curriculum);
    fixture.detectChanges();
    // get the first semester element
    el = de.query(By.css('.text-secondary')).nativeElement;
    expect(el.innerText).toBe('Semester 1:');
  });
  it('After selecting dropdown item, modules should be displayed', () => {
    fixture.detectChanges();
    const curriculum = { 'name': 'Software Engineering', 'code': 'SE', 'id': 1};
    component.onSelect(curriculum);
    fixture.detectChanges();
    // get the first module element
    el = de.query(By.css('p')).nativeElement;
    expect(el.innerText).toBe('Credits 5');
  });
});
