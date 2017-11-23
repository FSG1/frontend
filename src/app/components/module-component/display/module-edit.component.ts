import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../../backend.service';
import {EditableModuleOutput} from '../../../models/editmodels/editable_module_output';
import {EditableModuleInput} from '../../../models/editmodels/editable_module_input';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Lecturer} from '../../../models/lecturer';

@Component({
  selector: 'app-editable-module',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.scss']
})
export class ModuleEditComponent implements OnInit {

  constructor(private backendService: BackendService, private route: ActivatedRoute) {}
  output: EditableModuleOutput;
  input: EditableModuleInput;
  modulecode: string;

  selectedLecturer: Lecturer;

  private routeSubscription: Subscription;

  ngOnInit(): void {
    this.selectedLecturer = {
      'name': 'Lecturers',
      'id': -1
    };
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
      if(found) {
        this.output.active_lecturers.push(this.selectedLecturer);
      }
    }
  }
  // TODO send save data
  Save(): void {
    this.input = new EditableModuleInput(this.output);
  }
  calculateTotalEffort(): number {
    return this.output.credits * 28;
  }
}
