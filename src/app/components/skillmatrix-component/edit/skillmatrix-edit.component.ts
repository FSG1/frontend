import {Component, Input, OnInit, Output} from '@angular/core';
import {ArchitecturalLayer} from '../../../models/architecturallayer';
import {LifecycleActivity} from '../../../models/lifecycleactivity';
import {LearningGoal} from '../../../models/learninggoal';
import {isNullOrUndefined} from 'util';
import {StudentSkill} from '../../../models/studentskill';
import {BackendService} from '../../../backend.service';
import {EditableModuleOutput} from '../../../models/editmodels/editable_module_output';
/**
* This component is the editable skillmatrix found in the edit module page.
*/
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

  // these variables get selected when they get selected from html
  selectedArchtecturalLayer: ArchitecturalLayer;
  selectedLifecycleActivity: LifecycleActivity;
  selectedLevel: number;

  /**
   * This method adds a default value to he selected architecturallayer/lifecycleactivity so
   * Furthermore the lifecycactivities and architecturallayers get filled here
   */
  ngOnInit(): void {
    this.selectedArchtecturalLayer = {'id': -1, 'name': 'Architectural layer', 'description': null};
    this.selectedLifecycleActivity = {'id': -1, 'name': 'Lifecycle activity', 'description': null};
    this.backendService.getQualifications()
      .subscribe(filter => {
        this.lifecycleactivities = filter.lifecycle_activities;
        this.architecturallayers = filter.architectural_layers;
      });
  }

  /**
   * Because the name is not stored in the architectural layer it needs to be sought with the id in the general architecturallayer table
   * @param {number} id id of architecturallayer
   * @returns {string} returns name of architectural layer in table
   */
  getArchitecturalLayerName(id: number) {
    let name = '';
    if (!isNullOrUndefined(this.architecturallayers)) {
      this.architecturallayers.forEach(a => {
        if (a.id === id + 1) {
          name = a.name;
        }
      });
      return name;
    }
  }

  /**
   * Because the name is not stored in the lifecycle activity it needs to be sought with the id in the general lifecycle table
   * @param {number} id of lifecycle activity
   * @returns {string} returns name of lifecycle in table
   */
  getLifecycleActivityName(id: number) {
    if (!isNullOrUndefined(this.lifecycleactivities)) {
      let name = '';
      this.lifecycleactivities.forEach(l => {
        if (l.id === id + 1) {
          name = l.name;
        }
      });
      return name;
    }
  }

  /**
   * simple select method for architectural layer
   * @param {ArchitecturalLayer} architecturalLayer
   */
  selectArchitecturalLayer(architecturalLayer: ArchitecturalLayer): void {
    this.selectedArchtecturalLayer = architecturalLayer;
  }

  /**
   * simple select method for lifecycle activity
   * @param {LifecycleActivity} lifecycleActivity
   */
  selectLifecycleActivity(lifecycleActivity: LifecycleActivity): void {
    this.selectedLifecycleActivity = lifecycleActivity;
  }

  /**
   * This returns true if everything is filled in in order to add a skilllevel.
   * @returns {boolean}
   */
  canAddSkill(): boolean {
    // -1 is the value if it's unselected
    if (!isNullOrUndefined(this.selectedArchtecturalLayer.id !== -1 && this.selectedLifecycleActivity.id !== -1 && !isNullOrUndefined(this.selectedLevel))) {
      return false;
    }
    return true;
  }

  /**
   * This method adds a new skill to a learning goal.
   */
  addSkill(): void {
    // -1 is the value if it's unselected
    if (this.canAddSkill()) {
      let exist = false;
      this.lg.skillmatrix.forEach(entry => {
        if (entry.architectural_layer == this.selectedArchtecturalLayer.id && entry.lifecycle_activity == this.selectedLifecycleActivity.id) {
          exist = true;
        }
      });
      if (!exist) {
        const newskill: StudentSkill = {
          architectural_layer: this.selectedArchtecturalLayer.id,
          lifecycle_activity: this.selectedLifecycleActivity.id,
          level: this.selectedLevel
        };

        this.lg.skillmatrix.push(newskill);
      }
    }
  }

  /**
   * This method removes a skill from the studentmatrix.
   * @param {StudentSkill} sk the skill to be removed
   */
  removeSkill(sk: StudentSkill): void {
    this.lg.skillmatrix = this.lg.skillmatrix.filter(top => top != sk);
  }

  /**
   * method to remove a learning goal
   * @param {LearningGoal} lg this method removes the learning goal from the list
   */
  removeLg(lg: LearningGoal){
    this.output.learning_goals = this.output.learning_goals.filter(slg => slg != lg);
  }
}
