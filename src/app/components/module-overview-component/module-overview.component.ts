import {AfterContentInit, Component, OnInit} from '@angular/core';
import { Semester } from '../../models/semester.model';
import { BackendService} from '../../backend.service';
import {Curriculum} from '../../models/curriculum.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss'],
})
export class ModuleOverviewComponent implements AfterContentInit {
  semesters: Semester[];
  curricula: Curriculum[];
  selectedCurriculum: Curriculum;
  selectedCurriculumName: string;

  constructor(private backendService: BackendService, private router: Router) {
    this.curricula = [];
  }

  onSelect(curriculum: Curriculum): void {
    this.selectedCurriculum = curriculum;
    this.selectedCurriculumName = curriculum.name;
    this.getSemesters();
  }

  getSemesters(): void {
    if (this.selectedCurriculum != null) {
      this.backendService.getSemesters(this.selectedCurriculum.id).subscribe(semesters => this.semesters = semesters);
    }
  }

  getCurriculum(): void {
    this.backendService.getCurricula()
      .subscribe(curricula => this.curricula = curricula);
  }

  ngAfterContentInit(): void {
    this.getCurriculum();
  }

}
