import {Component, OnInit} from '@angular/core';
import {LearningGoal} from "../../models/learninggoal";
import {ArchitecturalLayer} from "../../models/architecturallayer";
import {Router} from "@angular/router";
import {LifecycleActivity} from "../../models/lifecycleactivity";
import {StudentSkill} from "../../models/studentskill";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
})
export class ModuleComponent implements OnInit{
  architecturallayers: ArchitecturalLayer[];
  lifecycleactivities: LifecycleActivity[];
  studentskills: StudentSkill[];

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
  }

  onSelect(learninggoal: LearningGoal): void {
  }
}

