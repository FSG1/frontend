import {Component, Input, OnInit, Output} from '@angular/core';
import {ArchitecturalLayer} from '../../../models/architecturallayer';
import {LifecycleActivity} from '../../../models/lifecycleactivity';
import {LearningGoal} from '../../../models/learninggoal';
import {isNullOrUndefined} from 'util';
import {StudentSkill} from '../../../models/studentskill';
import {BackendService} from '../../../backend.service';
import {EditableModuleOutput} from '../../../models/editmodels/editable_module_output';

@Component ({
  selector: 'app-skill-matrix-edit',
  templateUrl: './skillmatrix-edit.component.html',
  styleUrls: ['./skillmatrix-edit.component.scss']
})
export class SkillmatrixEditComponent implements OnInit {

  constructor(private backendService: BackendService) {
  }

  lifecycleactivities: LifecycleActivity[];
  architecturallayers: ArchitecturalLayer[];
  @Input() lg: LearningGoal;
  @Input() output: EditableModuleOutput;

  selectedArchtecturalLayer: ArchitecturalLayer;
  selectedLifecycleActivity: LifecycleActivity;
  selectedLevel: number;

  ngOnInit(): void {
    this.selectedArchtecturalLayer = {'id': -1, 'name': 'Architectural layer', 'description': null};
    this.selectedLifecycleActivity = {'id': -1, 'name': 'Lifecycle activity', 'description': null};
    this.backendService.getQualifications()
      .subscribe(filter => {
        this.lifecycleactivities = filter.lifecycle_activities;
        this.architecturallayers = filter.architectural_layers;
      });
  }

  getArchitecturalLayerName(id: number) {
    let name = '';
    if (!isNullOrUndefined(this.architecturallayers)) {
      this.architecturallayers.forEach(a => {
        if (a.id === id) {
          name = a.name;
        }
      });
      return name;
    }
  }

  getLifecycleActivityName(id: number) {
    if (!isNullOrUndefined(this.lifecycleactivities)) {
      let name = '';
      this.lifecycleactivities.forEach(l => {
        if (l.id === id) {
          name = l.name;
        }
      });
      return name;
    }
  }

  selectArchitecturalLayer(architecturalLayer: ArchitecturalLayer): void {
    this.selectedArchtecturalLayer = architecturalLayer;
  }

  selectLifecycleActivity(lifecycleActivity: LifecycleActivity): void {
    this.selectedLifecycleActivity = lifecycleActivity;
  }

  addSkill(goal: LearningGoal): void {
    if (this.selectedArchtecturalLayer.id !== -1 && this.selectedLifecycleActivity.id !== -1 && !isNullOrUndefined(this.selectedLevel)) {
      let exist = false;
      this.lg.skillmatrix.forEach(entry => {
        if (entry.architectural_layer == this.selectedArchtecturalLayer.id && entry.lifecycle_activity == this.selectedLifecycleActivity.id) {
          exist = true;
        }
      });
      if (!exist) {
        const newskill: StudentSkill = new StudentSkill();
        newskill.architectural_layer = this.selectedArchtecturalLayer.id;
        newskill.lifecycle_activity = this.selectedLifecycleActivity.id;
        newskill.level = this.selectedLevel;

        this.lg.skillmatrix.push(newskill);
      }
    }
  }

  removeSkill(sk: StudentSkill): void {
    this.lg.skillmatrix = this.lg.skillmatrix.filter(top => top != sk);
  }
  removeLg(lg: LearningGoal){
    this.output.learning_goals = this.output.learning_goals.filter(slg => slg != lg);
  }
}
