import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curriculum } from './curriculum.model';
import { Semesters } from './semesters.model';
import { BackendMockupService} from '../backend-mockup.service';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss']
})
export class ModuleOverviewComponent implements OnInit {
  semesters: Semesters[];

  constructor( private bms: BackendMockupService) {}

  getSemesters(): void {
    this.bms.getSemesters().then(semesters => this.semesters = semesters);
  }

  ngOnInit(): void {
    this.getSemesters();
  }
  get isLoggedIn() {
    return true;
  }
}
