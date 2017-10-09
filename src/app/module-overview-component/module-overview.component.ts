import { Component, OnInit } from '@angular/core';
import { Semester } from '../models/semester.model';
import { BackendService} from '../backend.service';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss']
})
export class ModuleOverviewComponent implements OnInit {
  semesters: Semester[];

  constructor( private bms: BackendService) {}

  getSemesters(): void {
    this.bms.getSemesters().subscribe(semesters => this.semesters = semesters);
  }

  ngOnInit(): void {
    this.getSemesters();
  }

  get isLoggedIn() {
    return true;
  }
}
