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

const outputmockup = {
  'id': 1,
  'code': 'DBS',
  'name': 'Databases',
  'credits': 5,
  'semesters': [1],
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
  'project_flag': false,
  'learning_goals': [
  {
    'name': 'LG 1',
    'description': 'apply control structures, function invocation and memory management in C ',
    'type': 'personal',
    'skillmatrix': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
      {'lifecycle_activity': 2, 'architectural_layer': 3, 'level': 1}],
    'assesment_types': null,
    'weight': null
  },
  {
    'name': 'LG 2',
    'description': 'apply object orientation and memory management in C++ managed and unmanaged',
    'type': 'personal',
    'skillmatrix': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1}],
    'assesment_types': null,
    'weight': null
  },
  {
    'name': 'LG 3',
    'description': 'apply C++11 and C++14 extensions of C++',
    'type': 'personal',
    'skillmatrix': [{'lifecycle_activity': 3, 'architectural_layer': 1, 'level': 2}],
    'assesment_types': null,
    'weight': null
  },
  {
    'name': 'LG 4',
    'description': 'do group stuff',
    'type': 'group',
    'skillmatrix': [{'lifecycle_activity': 0, 'architectural_layer': 0, 'level': 3}],
    'assesment_types': null,
    'weight': null
  }],
  'prior_knowledge_references': [],
  'assesment_parts': [
    {
      'subcode': 'sofa1',
      'description': 'research some stuff',
      'percentage': 0.1,
      'minimal_grade': 5.5,
      'remark': 'nice'
    },
    {
      'subcode': 'sofa2',
      'description': 'something',
      'percentage': 0.9,
      'minimal_grade': 5.5,
      'remark': 'not nice'
    }]
};

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
          this.output = outputmockup;
          /*
          this.backendService.getEditableModule(this.modulecode)
            .subscribe(emo => {
              this.output = emo;
            });
          */
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
