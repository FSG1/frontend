import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {SkillMatrixComponent} from './skillmatrix.component';

describe('Testing skillmatrix component', () => {
  let component: TestHostComponent;
  let testhostfixture: ComponentFixture<TestHostComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillMatrixComponent, TestHostComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testhostfixture = TestBed.createComponent(TestHostComponent);
    component = testhostfixture.componentInstance;
    testhostfixture.detectChanges();
  });

  it('testing checkForValue method. Should return a null, 1 and a 2', () => {
    const fixture = TestBed.createComponent(SkillMatrixComponent);
    const skillmatrixcomponent = fixture.componentInstance;
    fixture.detectChanges();
    skillmatrixcomponent.studentskills = [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
      {'lifecycle_activity': 2, 'architectural_layer': 3, 'level': 2}];
    expect(skillmatrixcomponent.checkForValue(1, 2)).toBe(null);
    expect(skillmatrixcomponent.checkForValue(3, 1)).toBe(1);
    expect(skillmatrixcomponent.checkForValue(3, 2)).toBe(2);
  });
  it('the skillmatrix should have 5 rows', () => {
    expect(testhostfixture.debugElement.queryAll(By.css('tr')).length).toBe(5);
  });
  it('should have 5 columns (this tests counts th, so dont mess with them!)', () => {
    expect(testhostfixture.debugElement.queryAll(By.css('th')).length).toBe(5);
  });
  // this component enables testing the skillmatrix component because it needs input to function!
  @Component({
    selector: `host-component`,
    template: `<app-skill-matrix [architecturallayers]="architecturallayers" [lifecycleactivities]="lifecycleactivities" [studentskills]="studentskills"></app-skill-matrix>`
  })
  class TestHostComponent {
    architecturallayers = [{'Architectural_layer_id': 0, 'Architectural_layer_name': 'User Interaction', 'Architectural_layer_description': 'something'},
      {'Architectural_layer_id': 1, 'Architectural_layer_name': 'Business Processes', 'Architectural_layer_description': 'something'},
      {'Architectural_layer_id': 2, 'Architectural_layer_name': 'Infrastructure', 'Architectural_layer_description': 'something'},
      {'Architectural_layer_id': 3, 'Architectural_layer_name': 'software', 'Architectural_layer_description': 'something'}];
    lifecycleactivities = [{'lifecycle_activity_id': 0, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'},
      {'lifecycle_activity_id': 1, 'lifecycle_activity_name': 'Analyze', 'lifecycle_activity_description': 'something'},
      {'lifecycle_activity_id': 2, 'lifecycle_activity_name': 'Advice', 'lifecycle_activity_description': 'something'},
      {'lifecycle_activity_id': 3, 'lifecycle_activity_name': 'Design', 'lifecycle_activity_description': 'something'}];
    studentskills = [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
      {'lifecycle_activity': 2, 'architectural_layer': 3, 'level': 2}];
  }
});

