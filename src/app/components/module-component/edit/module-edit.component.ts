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

  //#region selection variables
  selectedLecturer: Lecturer;
  selectedTopic: string;
  private routeSubscription: Subscription;
  selectedTeachingMaterial: string;
  selectedTeachingMaterialType: string;
  defaultType = 'Teaching Material';
  //#endregion

  ngOnInit(): void {
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
  //#endregion
  //#region teaching_materials
  removeTeachingMaterial(material: string): void {
    this.output.teaching_material = this.output.teaching_material.filter( tm => tm.name != material);
  }
  selectTeachingMaterialType(type: string): void {
    this.selectedTeachingMaterialType = type;
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
        this.output.teaching_material.push(new TeachingMaterial(this.selectedTeachingMaterial, this.selectedTeachingMaterialType));
        this.selectedTeachingMaterial = '';
      }
    }
  }
  //#endregion
  // send save data
  save(): void {
    this.input = new EditableModuleInput(this.output);
    this.backendService.updateEditableModule(this.output.id, this.input).subscribe(() => {
      this.location.back();
    }, (error) => {
      console.log("Error");
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
