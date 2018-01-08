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
import {SimpleModule} from '../../../models/editmodels/simple_module';
import {AssesmentPart} from '../../../models/assesment_part';
import {LearningGoal} from '../../../models/learninggoal';

/**
 * This component is part of the page where the module is edited
 */
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

  /**
   * The selected variables are variables the user changes. The name describes what it's about.
   */
  //#region selection variables
  selectedLecturer: Lecturer;
  selectedTopic: string;
  private routeSubscription: Subscription;
  selectedTeachingMaterial: string;
  selectedTeachingMaterialType: string;
  selectedAssesmentPart: AssesmentPart;
  selectedPriorKnowledgeRemark: string;
  selectedPriorModule: string;
  selectedLearningGoal: LearningGoal;
  selectedpriorKnowledgeType: string;
  /**
   * DefaultType is the default unselected teaching material
   * @type {string}
   */
  defaultType = 'Teaching Material';
  /**
   * This is the default unselected prior module value
   * @type {string}
   */
  defaultPriorModule= 'Module';
  /**
   * this is the default unselected teaching material type
   * @type {string}
   */
  defaultPriorType= 'Type';
  /**
   * This is a hardcoded list of default prior module types of which the user can choose
   * @type {[string , string , string]}
   */
  priorKnowledgeTypes = ['concurrent', 'mandatory', 'prior'];
  //#endregion

  /**
   * This method loads the edit component with the module's data.
   * It also loads the extra information required to edit the module like a list of all teachers.
   * This method also initializes some selected variables so the corresponding buttons in the HTML are not empty
   */
  ngOnInit(): void {
    this.selectedLearningGoal = {
      type: 'personal'
    };
    this.output = new EditableModuleOutput();
    this.selectedAssesmentPart = {};
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

  /**
   * In this region the methods exist to remove/select and add a lecturer to the module
  */
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
  /**
   * In this region the methods exists the remove/select and add a topic to the module
   */
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
  /**
   * In this region the methods exists the remove/select and add a teaching material to the module
   */
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
  /**
   * In this region the methods exists the remove/select and add a assesment part to the module
   */
  //#region assesmentParts
  canAddAssesment(): boolean {
    if (!isNullOrUndefined(this.selectedAssesmentPart.subcode) && !isNullOrUndefined(this.selectedAssesmentPart.description)  && !isNullOrUndefined(this.selectedAssesmentPart.percentage) && !isNullOrUndefined(this.selectedAssesmentPart.minimal_grade)) {
      return false;
    }
    return true;
  }
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
  //#endregion
  /**
   * In this region the methods exists the remove/select and add a prior knowledge reference to the module
   */
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
  /**
   * In this region the methods exists the remove and add a learning goal to the module
   */
  //#region learningGoals
  canAddLearningGoal(): boolean {
    if (!isNullOrUndefined(this.selectedLearningGoal.name) && !isNullOrUndefined(this.selectedLearningGoal.description) && !isNullOrUndefined(this.selectedLearningGoal.type) && !isNullOrUndefined(this.selectedLearningGoal.weight)) {
      return false;
    }
    return true;
  }
  addLearningGoal(): void {
    this.selectedLearningGoal.expanded = false;
    this.selectedLearningGoal.skillmatrix = new Array();
    this.output.learning_goals.push(this.selectedLearningGoal);
  }
  selectLearningGoalType(type: string) {
    this.selectedLearningGoal.type = type;
  }
  // #endregion
  /**
   * This method saves the module with the inputted value
   */
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

  /**
   * This method checks if some mandatory fields are filled in in order to save.
   * @returns {boolean}
   */
  canSave(): boolean {
    if (!isNullOrUndefined(this.output.credits) && !isNullOrUndefined(this.output.lectures_in_week) && !isNullOrUndefined(this.output.practical_hours_week) && this.output.code.length > 0 && this.output.name.length > 0 && this.output.active_lecturers.length > 0 && this.output.topics.length > 0) {
      return true;
    }
    return false;
  }

  /**
   * This method takes the user back to the previous page
   */
  back(): void {
    this.location.back();
  }
}
