import {Component, OnInit} from '@angular/core';
import {LearningGoal} from '../../models/learninggoal';
import {ArchitecturalLayer} from '../../models/architecturallayer';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {LifecycleActivity} from '../../models/lifecycleactivity';
import {StudentSkill} from '../../models/studentskill';
import {ModuleContent} from '../../models/modulecontent.model';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit{
  moduleContent: ModuleContent;
  architecturallayers: ArchitecturalLayer[];
  lifecycleactivities: LifecycleActivity[];
  studentskills: StudentSkill[];
  learninggoals: LearningGoal[];
  selectedModule: string;
  selectedLearningGoalName: string;

  constructor(private route: ActivatedRoute) {
    this.selectedLearningGoalName = '';
   this.route.params.subscribe(
     params => {this.selectedModule = params['module_code'];
     });
  }

  ngOnInit(): void {
    this.architecturallayers = [{'Architectural_layer_id': 1, 'Architectural_layer_name': 'User Interaction', 'Architectural_layer_description': 'something'},
      {'Architectural_layer_id': 2, 'Architectural_layer_name': 'Business Processes', 'Architectural_layer_description': 'something'},
      {'Architectural_layer_id': 3, 'Architectural_layer_name': 'Infrastructure', 'Architectural_layer_description': 'something'},
      {'Architectural_layer_id': 4, 'Architectural_layer_name': 'software', 'Architectural_layer_description': 'something'}];
    this.lifecycleactivities = [{'lifecycle_activity_id': 1, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'},
      {'lifecycle_activity_id': 2, 'lifecycle_activity_name': 'Analyze', 'lifecycle_activity_description': 'something'},
      {'lifecycle_activity_id': 3, 'lifecycle_activity_name': 'Advice', 'lifecycle_activity_description': 'something'},
      {'lifecycle_activity_id': 4, 'lifecycle_activity_name': 'Design', 'lifecycle_activity_description': 'something'}];
    this.studentskills = [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
      {'lifecycle_activity': 2, 'architectural_layer': 2, 'level': 2}];
    this.learninggoals = [
      {
        'name': 'LG 1',
        'description': 'apply control structures, function invocation and memory management in C ',
        'type': 'personal',
        'skillmatrix': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
          {'lifecycle_activity': 2, 'architectural_layer': 3, 'level': 1}]
      },
      {
        'name': 'LG 2',
        'description': 'apply object orientation and memory management in C++ managed and unmanaged',
        'type': 'personal',
        'skillmatrix': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1}]
      },
      {
        'name': 'LG 3',
        'description': 'apply C++11 and C++14 extensions of C++',
        'type': 'personal',
        'skillmatrix': [{'lifecycle_activity': 3, 'architectural_layer': 1, 'level': 2}]
      },
      {
        'name': 'LG 4',
        'description': 'do group stuff',
        'type': 'group',
        'skillmatrix': [{'lifecycle_activity': 0, 'architectural_layer': 0, 'level': 3}]
      }
    ];
  }

  onSelect(learningGoal: LearningGoal): void {
    if (this.selectedLearningGoalName === '') {
      this.selectedLearningGoalName = learningGoal.name;
    }else if (this.selectedLearningGoalName === learningGoal.name) {
      this.selectedLearningGoalName = '';
    }else {
      this.selectedLearningGoalName = learningGoal.name;
    }
  }
}

