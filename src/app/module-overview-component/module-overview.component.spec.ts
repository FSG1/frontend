import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleOverviewComponent } from './module-overview.component';
import {BackendService} from '../backend.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AppModule} from "../app.module";
import {InMemoryDataService} from "../in-memory-db/in-memory-data.service";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";



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
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule,
                  InMemoryWebApiModule.forRoot(InMemoryDataService)],
      declarations: [ ModuleOverviewComponent ],
      providers: [BackendService]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    backendService = fixture.debugElement.injector.get(BackendService);
    spy = spyOn(backendService, 'getSemesters').and.returnValues(Promise.resolve(semesters));
    de = fixture.debugElement.query(By.css('div'));
    el = fixture.nativeElement.querySelector('h2');
  });

  it('should show semester 1 after the data is send', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges();        // update view with quote
      expect(el.innerText).toBe('Semester 1');
    });
  }));
});
