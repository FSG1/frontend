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
import {PriorKnowledgeReference} from '../../../models/prior_knowledge_reference.model';
import {Module} from '../../../models/module.model';
import { Location } from '@angular/common';
import {SimpleModule} from '../../../models/qualificiationfiltermodels/simple_module';
import {AssesmentPart} from '../../../models/assesment_part';
import {LearningGoal} from '../../../models/learninggoal';

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
  selectedAssesmentPart: AssesmentPart;
  selectedLearningGoal: LearningGoal;
  defaultType = 'Teaching Material';
  selectedPriorKnowledgeRemark: string;
  selectedPriorModule: string;
  defaultPriorModule= 'Module';
  defaultPriorType= 'Type';
  priorKnowledgeTypes = ['concurrent', 'mandatory', 'prior'];
  selectedpriorKnowledgeType: string;
  //#endregion

  ngOnInit(): void {
    this.selectedLearningGoal = new LearningGoal();
    this.selectedLearningGoal.type = 'personal';
    this.output = new EditableModuleOutput();
    this.selectedAssesmentPart = new AssesmentPart();
    this.selectedLecturer = {
      'name': 'Lecturers',
      'id': -1
    };
    this.selectedPriorModule = this.defaultPriorModule;
    this.selectedpriorKnowledgeType = this.defaultPriorType;
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
  // endregion
  // assesmentParts region
  addAssesmentPart(): void {
    if (!isNullOrUndefined(this.selectedAssesmentPart)) {
      let found = true;
      this.output.assesment_parts.forEach(a => {
        if (a.subcode === this.selectedAssesmentPart.subcode) {
          found = false;
        }
      });
      if (found) {
        this.output.assesment_parts.push(this.selectedAssesmentPart);
      }
    }
  }
  removeAssesmentPart(assesmentPart: AssesmentPart): void {
    this.output.assesment_parts = this.output.assesment_parts.filter( as => as !== assesmentPart);
  }
  editAssesmentPart(assesmentPart: AssesmentPart): void {
    this.output.assesment_parts = this.output.assesment_parts.filter( as => as !== assesmentPart);
    this.output.assesment_parts.push(assesmentPart);
  }
  //#endregion
  //#region prior knowledge references
  removePriorReference(prior: string): void {
    this.output.prior_knowledge_references = this.output.prior_knowledge_references.filter( pr => pr.name != prior);
  }
  addPriorReference(): void {
    if (this.selectedPriorModule != this.defaultPriorModule &&  this.selectedpriorKnowledgeType != this.defaultPriorType) {
      let found = true;
      this.output.prior_knowledge_references.forEach( pkr => {
        if (pkr.name === this.selectedPriorModule) {
          found = false;
        }
      });
      if (found) {
        let module: SimpleModule;
        this.output.modules.forEach( m => {
          if (m.name === this.selectedPriorModule) {
            module = m;
          }
        });
        this.output.prior_knowledge_references.push(new PriorKnowledgeReference(module, this.selectedpriorKnowledgeType, this.selectedPriorKnowledgeRemark));
        this.selectedPriorKnowledgeRemark = '';
      }
    }
  }
  selectPriorKnowledgeModule(modulename: string): void {
    this.selectedPriorModule = modulename;
  }
  selectPriorKnowledgeType(type: string): void {
    this.selectedpriorKnowledgeType = type;
  }
  //#endregion
  //#region learningGoals
  addLearningGoal(): void {
    this.selectedLearningGoal.expanded = false;
    this.selectedLearningGoal.skillmatrix = new Array();
    this.output.learning_goals.push(this.selectedLearningGoal);
  }
  selectLearningGoalType(type: string) {
    this.selectedLearningGoal.type = type;
  }
  // #endregion
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
