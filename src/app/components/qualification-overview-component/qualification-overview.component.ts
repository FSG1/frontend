import {AfterContentInit, Component} from '@angular/core';
import {FilterQualifications} from '../../models/qualificiationfiltermodels/filter_qualifications.model';
import {Curriculum} from '../../models/curriculum.model';
import {LifecycleActivity} from '../../models/lifecycleactivity';
import {ArchitecturalLayer} from '../../models/architecturallayer';
import {BackendService} from '../../backend.service';
import {QualificationsOverview} from '../../models/qualificiationfiltermodels/qualifications_overview.model';
import {QualificationsModule} from '../../models/qualificiationfiltermodels/qualifications_module';
import {forEach} from '@angular/router/src/utils/collection';
import {QualificationsOverviewSemester} from "../../models/qualificiationfiltermodels/qualifications_overview_semester.model";

@Component({
  selector: 'app-qualification-overview',
  templateUrl: './qualification-overview.component.html',
  styleUrls: ['./qualification-overview.component.scss']
})
export class QualificationOverviewComponent implements AfterContentInit {
  filter: FilterQualifications;
  table: QualificationsOverview[];
  selectedcurriculum: Curriculum;
  selectearchitecurallayer: ArchitecturalLayer;
  selectedlifecycle: LifecycleActivity;
  constructor(private backendService: BackendService, ) {}
  readytoload: boolean;
  tablesize: number[];

  selectCurriculum(curriculum: Curriculum): void {
    this.selectedcurriculum = curriculum;
    if(this.readyToLoadTable()) {
      this.loadTable();
    }
  }
  selectedLifecycle(lifecycle: LifecycleActivity): void {
    this.selectedlifecycle = lifecycle;
    if(this.readyToLoadTable()) {
      this.loadTable();
    }
  }
  selectedArchitecturalLayer(architecturallayer: ArchitecturalLayer): void {
    this.selectearchitecurallayer = architecturallayer;
    if(this.readyToLoadTable()) {
      this.loadTable();
    }
  }
  readyToLoadTable(): boolean {
    if (this.readytoload) {
      return this.readytoload;
    } else if (this.selectedcurriculum != null && this.selectearchitecurallayer != null && this.selectedlifecycle) {
      this.readytoload = true;
      return this.readytoload;
    }
    return false;
  }
  loadTable(): void {
    this.backendService.getQualificationTable(this.selectedcurriculum.id, this.selectearchitecurallayer.architectural_layer_id, this.selectedlifecycle.lifecycle_activity_id)
      .subscribe(table => this.table = table);
    this.countTotalLearningGoals(this.table);
  }
  countLearningGoalsSkillLevel(semesters: QualificationsOverviewSemester[]): number {
    let returnvalue: number;
    returnvalue = 0;
    semesters.forEach(item => {
      item.qualifications_modules.forEach(modules => {returnvalue += modules.learning_goals.length; });
    });
    return returnvalue;
  }
  countTotalLearningGoals(overview: QualificationsOverview[]): void {
    let returnvalue: number;
    returnvalue = 0;
    overview.forEach( tabl => {returnvalue += this.countLearningGoalsSkillLevel(tabl.qualification_overview_semesters); });
    this.tablesize = Array(returnvalue).fill(0).map((x, i) => i);
  }
  getSkillLevel(spot: number): number {
    let level: number;
    let lowerboundary: number;
    lowerboundary = 0;
    let upperboundary: number;
    upperboundary = 0;
    for (let i = 0; i < this.table.length; i++) {
      level = this.table[i].skills_level;
      upperboundary += this.countLearningGoalsSkillLevel(this.table[i].qualification_overview_semesters);
      // have to test if boundary works
      if (spot >= lowerboundary && spot < upperboundary) {
        return level;
    }
      lowerboundary = upperboundary;

    }
  return -1;
  }
  getSemester(spot: number): number {
    let lowerboundary: number;
    lowerboundary = 0;
    let upperboundary: number;
    upperboundary = 0;

    for (let i = 0; i < this.table.length; i++) {
      for (let j = 0; j < this.table[i].qualification_overview_semesters.length; j++) {
        this.table[i].qualification_overview_semesters[j].qualifications_modules.forEach( modules => {
          upperboundary += modules.learning_goals.length;
        });
        if (spot >= lowerboundary && spot < upperboundary) {
          return this.table[i].qualification_overview_semesters[j].semester;
        }
        lowerboundary = upperboundary;
      }
    }
    return -1;
  }
  getModule(spot: number): QualificationsModule {
    let lowerboundary: number;
    lowerboundary = 0;
    let upperboundary: number;
    upperboundary = 0;
    for (let i = 0; i < this.table.length; i++) {
      const overview = this.table[i];
      for (let j = 0; j < overview.qualification_overview_semesters.length; j++) {
        const semester = overview.qualification_overview_semesters[j];
        for (let k = 0; k < semester.qualifications_modules.length; k++) {
          upperboundary = semester.qualifications_modules[k].learning_goals.length;
          if (spot >= lowerboundary && spot < upperboundary) {
            return semester.qualifications_modules[k];
          }
          lowerboundary = upperboundary;
        }
      }
    }

    return null;
  }
  getModuleCode(spot: number): string {
    const module = this.getModule(spot);
    if(module === null) {
      return '-1';
    }
    return this.getModule(spot).module_code;
  }
  getModuleCredits(spot: number): number {
    let lowerboundary: number;
    lowerboundary = 0;
    let upperboundary: number;
    upperboundary = 0;
    for (let i = 0; i < this.table.length; i++) {
      const overview = this.table[i];
      for (let j = 0; j < overview.qualification_overview_semesters.length; j++) {
        const semester = overview.qualification_overview_semesters[j];
        for (let k = 0; k < semester.qualifications_modules.length; k++) {
          upperboundary = semester.qualifications_modules[k].learning_goals.length;
          if (spot >= lowerboundary && spot < upperboundary) {
            return semester.qualifications_modules[k].credits;
          }
          lowerboundary = upperboundary;
        }
      }
    }

    return -1;
  }
  ngAfterContentInit(): void {
    this.readytoload = false;
    this.backendService.getQualifications()
      .subscribe(filter => this.filter = filter);
  }
}
