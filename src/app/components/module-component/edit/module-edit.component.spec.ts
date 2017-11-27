import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';
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
import {By} from '@angular/platform-browser';
import {AppComponent} from '../../../app.component';

const outputmockup = {
  'id': 1,
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
  'credentials': 'vey nice course',
  'project_flag': false
};

describe('Testing module edit component', () => {
  //#region variables
  let component: ModuleEditComponent;
  let fixture: ComponentFixture<ModuleEditComponent>;
  let de: DebugElement;
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
      declarations: [ModuleEditComponent],
      providers: [ {provide: BackendService, useValue: backendServiceStub} ,
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'module_code': 'DBS1'}]) } },
        { provide: APP_BASE_HREF, useValue: '/'},
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: AppComponent, useValue: new AppComponent() }
      ],
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
  it('Testing everything of lecturers', () => {
    expect(de.queryAll(By.css('.test-lecturers')).length).toBe(2);
    const vdh = {
      'id': 5,
      'name': 'Van der Ham, R',
    };
    // testing if you can add lecturer without adding
    fixture.detectChanges();
    component.addLecturer();
    expect(de.queryAll(By.css('.test-lecturers')).length).toBe(2);
    // testing if anything gets removed if we remove non added lecturer.
    component.removeLecturer(vdh);
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-lecturers')).length).toBe(2);
    // testing if you can add lecturer with adding
    expect(component.selectedLecturer.id).toBe(-1);
    component.selectLecturer(vdh);
    expect(component.selectedLecturer.id).toBe(5);
    component.addLecturer();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-lecturers')).length).toBe(3);
    // testing if we can add existing lecturer
    component.addLecturer();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-lecturers')).length).toBe(3);
    // testing removing;
    component.removeLecturer(vdh);
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-lecturers')).length).toBe(2);
  });
  it('Testing everything to do with topics', () => {
    expect(de.queryAll(By.css('.test-topics')).length).toBe(3);
    const topic = 'lmao';
    // testing if we can add empty or default
    component.addTopic();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-topics')).length).toBe(3);
    component.selectedTopic = '';
    component.addTopic();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-topics')).length).toBe(3);
    // should block if one tries to add only spaces
    component.selectedTopic = '  ';
    component.addTopic();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-topics')).length).toBe(3);
    component.selectedTopic = topic;
    component.addTopic();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-topics')).length).toBe(4);
    // shouldn't add double
    component.selectedTopic = topic;
    component.addTopic();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-topics')).length).toBe(4);
    component.removeTopic('empty');
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-topics')).length).toBe(4);
    component.removeTopic(topic);
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-topics')).length).toBe(3);
  });
  it('testing everything to do with teaching material', () => {
    const material = 'spaghetti';
    const type = ['book', 'website', 'physical'];
    expect(de.queryAll(By.css('.test-teaching-material')).length).toBe(3);
    // testing if you can add the default
    component.addTeachingMaterials();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-teaching-material')).length).toBe(3);
    // only adds if both a type and teaching material is selected
    component.selectedTeachingMaterial = material;
    component.addTeachingMaterials();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-teaching-material')).length).toBe(3);
    component.selectTeachingMaterialType('physical');
    component.addTeachingMaterials();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-teaching-material')).length).toBe(4);
    // not existing material
    component.removeTeachingMaterial('physical');
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-teaching-material')).length).toBe(4);
    component.removeTeachingMaterial(material);
    fixture.detectChanges();
    expect(de.queryAll(By.css('.test-teaching-material')).length).toBe(3);
  });
});
