import { Component, OnInit } from '@angular/core';
import {Semester} from "./models/semester";

import { BackendMockupService } from './backend.mockup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app wors!';
  semesters: Semester[];

  constructor( private bms: BackendMockupService) {}

  getSemesters(): void{
    this.bms.getSemesters().then(semesters => semesters);
  }

  ngOnInit(): void{
    this.getSemesters();
  }
}
