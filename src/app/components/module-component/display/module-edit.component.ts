import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../../backend.service';
import {EditableModuleOutput} from '../../../models/editmodels/editable_module_output';
import {EditableModuleInput} from '../../../models/editmodels/editable_module_input';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

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

  private routeSubscription: Subscription;

  ngOnInit(): void {
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
  // TODO send save data
  Save(): void {
    this.input = new EditableModuleInput(this.output);
  }
  calculateTotalEffort(): number {
    return this.output.credits * 28;
  }
}
