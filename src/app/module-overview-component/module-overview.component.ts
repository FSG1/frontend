import { Component, OnInit } from '@angular/core';
import { Semester } from '../models/semester.model';
import { BackendService} from '../backend.service';
import {Curriculum} from '../models/curriculum.model';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss']
})
export class ModuleOverviewComponent implements OnInit {
  semesters: Semester[];
  curricula: Curriculum[];
  selectedCurriculum: number;

  constructor(private backendService: BackendService) {
  }

  onSelect(curriculum: Curriculum): void {
    this.selectedCurriculum = curriculum.id;
    this.getSemesters();
  }

  getSemesters(): void {
    if (this.selectedCurriculum != null) {
      this.backendService.getSemesters(this.selectedCurriculum).subscribe(semesters => this.semesters = semesters);
    }else {
      console.log('selectedCurriculum is empty!');
    }
  }

  getCurriculum(): void {
    this.backendService.getCurricula().subscribe(curricula => this.curricula = curricula);
  }

  ngOnInit(): void {
    this.getCurriculum();
    // this.selectedCurriculum = 'BI';
    // this.getSemesters();
  }

  get isLoggedIn() {
    return true;
  }
}
