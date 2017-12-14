import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../../backend.service';
import {EditableModuleOutput} from '../../../models/editmodels/editable_module_output';
import {EditableModuleInput} from '../../../models/editmodels/editable_module_input';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Lecturer} from '../../../models/lecturer';
import {TeachingMaterial} from '../../../models/teaching_material';
import {isNullOrUndefined} from 'util';
import {RestrictedComponent} from '../../../../util/RestrictedComponent';
import {AppComponent} from '../../../app.component';
import { Location } from '@angular/common';
import {LearningGoal} from '../../../models/learninggoal';
import {StudentSkill} from '../../../models/studentskill';
import {ArchitecturalLayer} from '../../../models/architecturallayer';
import {LifecycleActivity} from '../../../models/lifecycleactivity';

@Component({
  selector: 'app-editable-module',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.scss']
})
  export class ModuleEditComponent extends RestrictedComponent implements OnInit {

  constructor(private backendService: BackendService, private route: ActivatedRoute, app: AppComponent, router: Router, private location: Location) {
    super(app, router);
  }

  output: EditableModuleOutput;
  input: EditableModuleInput;
  modulecode: string;
  lifecycle_activities: LifecycleActivity[];
  architectural_layers: ArchitecturalLayer[];

  //#region selection variables
  selectedLecturer: Lecturer;
  selectedTopic: string;
  private routeSubscription: Subscription;
  selectedTeachingMaterial: string;
  selectedTeachingMaterialType: string;
  selectedLearningGoal: LearningGoal;
  selectedArchtecturalLayer: ArchitecturalLayer;
  selectedLifecycleActivity: LifecycleActivity;
  selectedLevel: number;
  defaultType = 'Teaching Material';
  //#endregion

  ngOnInit(): void {
    this.backendService.getQualifications()
      .subscribe(filter => {
        this.lifecycle_activities = filter.lifecycle_activities;
        this.architectural_layers = filter.architectural_layers;
      });
    this.selectedLearningGoal = new LearningGoal();
    this.output = new EditableModuleOutput();
    this.selectedLecturer = {
      'name': 'Lecturers',
      'id': -1
    };
    this.selectedTeachingMaterialType = this.defaultType;
    this.routeSubscription = this.route.params.subscribe(
      params => {
        if (params['module_code']) {
          this.modulecode = params['module_code'];
          this.backendService.getEditableModule(this.modulecode)
            .subscribe(emo => {
              this.output = emo;
            });
          }});
  }
  //#region lecturers
  removeLecturer(lect: Lecturer): void {
    this.output.active_lecturers = this.output.active_lecturers.filter( lec => lec.id !== lect.id);
  }
  selectLecturer(lect: Lecturer): void {
    this.selectedLecturer = lect;
  }
  addLecturer(): void {
    if (this.selectedLecturer.id !== -1) {
      let found = true;
      this.output.active_lecturers.forEach( lect => {
        if (lect.id === this.selectedLecturer.id) {
          found = false;
        }
      });
      if (found) {
        this.output.active_lecturers.push(this.selectedLecturer);
      }
    }
  }
  //#endregion lecturers
  //#region topics
  removeTopic(topic: string): void {
    this.output.topics = this.output.topics.filter( top => top != topic);
  }
  addTopic(): void {
    if ( !isNullOrUndefined(this.selectedTopic) && this.selectedTopic.trim().length) {
      let found = true;
      this.output.topics.forEach( t => {
        if (t === this.selectedTopic) {
          found = false;
        }
      });
      if (found) {
        this.output.topics.push(this.selectedTopic);
        this.selectedTopic = '';
      }
    }
  }
  topicUp(topic: string): void {
    const index = this.output.topics.indexOf(topic);
    if (index !== 0) {
      const objectToGoDown = this.output.topics[index - 1];
      this.output.topics[index - 1] = topic;
      this.output.topics[index] = objectToGoDown;
    }
  }
  topicDown(topic: string): void {
    const index = this.output.topics.indexOf(topic);
    if (index !== (this.output.topics.length - 1)) {
      const objectToGoDown = this.output.topics[index + 1];
      this.output.topics[index + 1] = topic;
      this.output.topics[index] = objectToGoDown;
    }
  }
  //#endregion
  //#region teaching_materials
  removeTeachingMaterial(material: string): void {
    this.output.teaching_material = this.output.teaching_material.filter( tm => tm.name != material);
  }
  selectTeachingMaterialType(type: string): void {
    this.selectedTeachingMaterialType = type;
    console.log(type);
  }
  addTeachingMaterials(): void {
    if (!isNullOrUndefined(this.selectedTeachingMaterial) && this.selectedTeachingMaterial.trim().length && this.selectedTeachingMaterialType != this.defaultType) {
      let found = true;
      this.output.teaching_material.forEach( tm => {
        if (tm.name === this.selectedTeachingMaterial) {
          found = false;
        }
      });
      if (found) {
        console.log(this.selectedTeachingMaterialType);
        this.output.teaching_material.push(new TeachingMaterial(this.selectedTeachingMaterial, this.selectedTeachingMaterialType));
        this.selectedTeachingMaterial = '';
      }
    }
  }
  teachingMaterialUp(material: TeachingMaterial): void {
    const index = this.output.teaching_material.indexOf(material);
    if (index !== 0) {
      const objectToGoDown = this.output.teaching_material[index - 1];
      this.output.teaching_material[index - 1] = material;
      this.output.teaching_material[index] = objectToGoDown;
    }
  }
  teachingMaterialDown(material: TeachingMaterial): void {
    const index = this.output.teaching_material.indexOf(material);
    if (index !== (this.output.teaching_material.length - 1)) {
      const objectToGoDown = this.output.teaching_material[index + 1];
      this.output.teaching_material[index + 1] = material;
      this.output.teaching_material[index] = objectToGoDown;
    }
  }
  //#endregion
  // #region learningGoals
  addLearningGoal(): void {
    this.selectedLearningGoal.expanded = false;
    this.selectedLearningGoal.skillmatrix = new Array();
    this.output.learning_goals.push(this.selectedLearningGoal);
  }
  selectLearningGoalType(type: string) {
    this.selectedLearningGoal.type = type;
  }
  getArchitecturalLayerName(id: number) {
    let name = '';
    if (!isNullOrUndefined(this.architectural_layers)) {
      this.architectural_layers.forEach( a => {
        if (a.id === id) {
          name =  a.name;
        }
      });
      return name;
    }
  }
  getLifecycleActivityName(id: number) {
    if (!isNullOrUndefined(this.lifecycle_activities)) {
      let name = '';
      this.lifecycle_activities.forEach( l => {
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
    const selectedSkill: StudentSkill = new StudentSkill();
    selectedSkill.architectural_layer = this.selectedArchtecturalLayer.id;
    selectedSkill.lifecycle_activity = this.selectedLifecycleActivity.id;
    selectedSkill.level = this.selectedLevel;
    this.output.learning_goals.forEach(lg => {
      if (lg === goal) {
        lg.skillmatrix.push(selectedSkill);
        console.log(this.output.learning_goals);
      }
    });
  }
  removeSkill(goal: LearningGoal, sk: StudentSkill): void {
    this.output.learning_goals.forEach(lg => {
      if (lg === goal) {
        lg.skillmatrix.filter(s => s.lifecycle_activity !== sk.lifecycle_activity && s.architectural_layer !== sk.architectural_layer);
      }
    });
  }
  // #end region
  // send save data
  save(): void {
    this.input = new EditableModuleInput(this.output);
    this.backendService.updateEditableModule(this.output.id, this.input).subscribe(() => {
      this.location.back();
    }, (error) => {
      console.log('Error');
      console.log(error);
    });

  }
  calculateTotalEffort(): number {
    return this.output.credits * 28;
  }
  canSave(): boolean {
    if (!isNullOrUndefined(this.output.credits) && !isNullOrUndefined(this.output.lectures_in_week) && !isNullOrUndefined(this.output.practical_hours_week) && this.output.code.length > 0 && this.output.name.length > 0 && this.output.active_lecturers.length > 0 && this.output.topics.length > 0) {
      return true;
    }
    return false;
  }
  back(): void {
    this.location.back();
  }
}
