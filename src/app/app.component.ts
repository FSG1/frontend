import { Component, OnInit } from '@angular/core';
import {Semester} from './semester';

import { BackendMockupService } from './backend-mockup.service';

@Component({
  selector: 'app-fmms',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  semesters: Semester[];

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
