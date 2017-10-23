import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {ModuleComponent} from './module.component';
import {Observable} from 'rxjs/Observable';
import {ModuleContent} from '../models/modulecontent.model';
import {Subscriber} from 'rxjs/Subscriber';
import {BackendService} from '../backend.service';
import {By} from '@angular/platform-browser';


const modulemodel = {
    'module_code': 'IOT',
    'module_name': 'Internet of Things',
    'credits': 5,
    'architecturallayers': [{'Architectural_layer_id': 0, 'Architectural_layer_name': 'User Interaction', 'Architectural_layer_description': 'something'},
                            {'Architectural_layer_id': 1, 'Architectural_layer_name': 'Business Processes', 'Architectural_layer_description': 'something'},
                            {'Architectural_layer_id': 2, 'Architectural_layer_name': 'Infrastructure', 'Architectural_layer_description': 'something'},
                            {'Architectural_layer_id': 3, 'Architectural_layer_name': 'software', 'Architectural_layer_description': 'something'}],
    'lifecycleactivities': [{'lifecycle_activity_id': 0, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'},
                            {'lifecycle_activity_id': 1, 'lifecycle_activity_name': 'Analyze', 'lifecycle_activity_description': 'something'},
                            {'lifecycle_activity_id': 2, 'lifecycle_activity_name': 'Advice', 'lifecycle_activity_description': 'something'},
                            {'lifecycle_activity_id': 3, 'lifecycle_activity_name': 'Design', 'lifecycle_activity_description': 'something'}],
    'learning_goals':  [
      {
        'name': 'LG 1',
        'description': 'apply control structures, function invocation and memory management in C ',
        'type': 'personal',
        'skillmatrix': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
                        {'lifecycle_activity': 2, 'architectural_layer': 3, 'level': 1}]
      },
      {
        'name': 'LG 2',
        'description': 'apply object orientation and memory management in C++ managed and unmanaged',
        'type': 'personal',
        'skillmatrix': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1}]
      },
      {
        'name': 'LG 3',
        'description': 'apply C++11 and C++14 extensions of C++',
        'type': 'personal',
        'skillmatrix': [{'lifecycle_activity': 3, 'architectural_layer': 1, 'level': 2}]
      },
      {
        'name': 'LG 4',
        'description': 'do group stuff',
        'type': 'group',
        'skillmatrix': [{'lifecycle_activity': 0, 'architectural_layer': 0, 'level': 3}]
      }
    ]
  };

describe('Testing module component', () => {
  let component: ModuleComponent;
  let fixture: ComponentFixture<ModuleComponent>;
  //let de:      DebugElement;
  //let el:      HTMLElement;
  let backendService;

  const backendServiceStub = {
    getModule(modulecode: string): Observable<ModuleContent[]> {
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(modulemodel);
        observer.complete();
      });
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleComponent ],
      providers: [ {provide: BackendService, useValue: backendServiceStub} ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backendService = fixture.debugElement.injector.get(BackendService);
    //de = fixture.debugElement.query(By.css('.dropdown-menu'));
    // el = de.nativeElement;
  });

});

