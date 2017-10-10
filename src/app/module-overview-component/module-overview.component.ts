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
  curriculums: Curriculum[];
  selectedCurriculum: string;

  constructor(private backendService: BackendService) {
    this.curriculums = [
      { id: 1, code: 'BI', name: 'Business Informatics' },
      { id: 2, code: 'SE', name: 'Software Engineering' },
    ];
  }

  onSelect(curriculum: Curriculum): void {
    this.selectedCurriculum = curriculum.code;
    console.log(this.selectedCurriculum);
    this.getSemesters();
  }

  getSemesters(): void {
    if (this.selectedCurriculum != null) {
      this.backendService.setUrl('http://localhost:8080/fmms/curriculum/' + this.selectedCurriculum + '/semesters');
      this.backendService.getSemesters().subscribe(semesters => this.semesters = semesters);
    }else {
      console.log('selectedCurriculum is empty!');
    }
  }

  ngOnInit(): void {
    // this.selectedCurriculum = 'BI';
    // this.getSemesters();
  }

  get isLoggedIn() {
    return true;
  }
}
