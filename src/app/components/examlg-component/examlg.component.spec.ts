/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ExamLGComponent} from './examlg.component';
import {LearningGoal} from '../../models/learninggoal';

describe('Testing skillmatrix component', () => {
  let component: TestHostComponent;
  let testhostfixture: ComponentFixture<TestHostComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamLGComponent, TestHostComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testhostfixture = TestBed.createComponent(TestHostComponent);
    component = testhostfixture.componentInstance;
    testhostfixture.detectChanges();
  });
  it('should exist 3 fields with variable information', () => {
    expect(testhostfixture.debugElement.queryAll(By.css('.type')).length).toBe(2);
  });

  // this component enables testing the examlg component because it needs input to function!
  @Component({
    selector: `host-component`,
    template: `<app-exam-lg [lg]="lg"></app-exam-lg>`
  })
  class TestHostComponent {
    lg: LearningGoal ={name: null, description: null, type: 'personal', skillmatrix: null, assesment_types: ['oral', 'written exam'], weight: 0.5};
  }
});*/

