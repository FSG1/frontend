import {AfterContentInit, Component} from '@angular/core';
import {FilterQualifications} from '../../models/qualificiationfiltermodels/filter_qualifications.model';
import {Curriculum} from '../../models/curriculum.model';
import {LifecycleActivity} from '../../models/lifecycleactivity';
import {ArchitecturalLayer} from '../../models/architecturallayer';
import {BackendService} from '../../backend.service';
import {QualificationsOverview} from '../../models/qualificiationfiltermodels/qualifications_overview.model';
import {QualificationsModule} from '../../models/qualificiationfiltermodels/qualifications_module';
import {QualificationsLearningGoal} from '../../models/qualificiationfiltermodels/qualifications_learning_goal.model';

@Component({
  selector: 'app-qualification-overview',
  templateUrl: './qualification-overview.component.html',
  styleUrls: ['./qualification-overview.component.scss']
})
export class QualificationOverviewComponent implements AfterContentInit {

  filter: FilterQualifications;
  table: QualificationsOverview[];
  selectedcurriculum: Curriculum;
  selectedarchitecturallayer: ArchitecturalLayer;
  selectedlifecycle: LifecycleActivity;
  constructor(private backendService: BackendService, ) {}
  // this variable changes to true as soon as all filters are selected.
  readytoload: boolean;
  // this variable is made to create a table of size x
  tablesize: number[];
  // these variables are used to check if something is loaded or not
  lastloadedskilllevel: number;
  lastloadedsemester: number;
  lastloadedmodulecode: string;
  skilllevelchanged: boolean;

  // these three methods are used for selecting filter
  selectCurriculum(curriculum: Curriculum): void {
    this.selectedcurriculum = curriculum;
    this.readyToLoadTable();
  }
  selectedLifecycle(lifecycle: LifecycleActivity): void {
    this.selectedlifecycle = lifecycle;
    this.readyToLoadTable();
  }
  selectedArchitecturalLayer(architecturallayer: ArchitecturalLayer): void {
    this.selectedarchitecturallayer = architecturallayer;
    this.readyToLoadTable();
  }
  // this method checks if all filters have been entered
  readyToLoadTable(): boolean {
    if (this.readytoload) {
      return this.readytoload;
    } else if (this.selectedcurriculum != null && this.selectedarchitecturallayer != null && this.selectedlifecycle) {
      this.readytoload = true;
      this.loadTable();
      return this.readytoload;
    }
    return false;
  }
  // this method is used to load table
  loadTable(): void {
    this.backendService.getQualificationTable(this.selectedcurriculum.id, this.selectedarchitecturallayer.architectural_layer_id, this.selectedlifecycle.lifecycle_activity_id)
      .subscribe(table => {
         this.table = table;
         return this.countTotalLearningGoals(this.table);
      });

  }

  // this method calculates the size(rows) of the table
  countTotalLearningGoals(overview: QualificationsOverview[]): void {
    let returnvalue: number;
    returnvalue = 0;
    overview.forEach(qualificationOverview => {
      qualificationOverview.qualifications_overview_semesters.forEach(qualificationOverviewSemester => {
        qualificationOverviewSemester.qualifications_modules.forEach(module => {
          returnvalue += module.learning_goals.length;
        });
      });
    });
    this.tablesize = Array(returnvalue).fill(0).map((x, i) => i);
  }
  // the following three methods calculates the value and rowspan of the skill level part of the table.
  getSkillLevel(spot: number): number {
    let count: number;
    let level: QualificationsOverview;
    count = 0;
    this.table.forEach(overview => {
      overview.qualifications_overview_semesters.forEach( semester => {
        semester.qualifications_modules.forEach( module => {
          module.learning_goals.forEach( lg => {
            if (count === spot) {
              level = overview;
            }
            count++;
          });
        });
      });
    });
  return level.skills_level;
  }
  getSkillLevelRowSpan(spot: number): number {
    const skillevel = this.getSkillLevel(spot);
    let rowspan: number;
    rowspan = 0;
    for (const tab of this.table){
      if (tab.skills_level === skillevel) {
        tab.qualifications_overview_semesters.forEach( semester => {
          semester.qualifications_modules.forEach( modules => {
            rowspan += modules.learning_goals.length;
          });
        });
      }
    }
    return rowspan;
  }
  levelLoaded(spot: number): boolean {
    const skillevel = this.getSkillLevel(spot);
    if (this.lastloadedskilllevel === skillevel) {
      return false;
    }
    this.skilllevelchanged = true;
    this.lastloadedskilllevel = skillevel;
    return true;
  }
  // the following three methods calculates the value and rowspan of the semester level part of the table.
  getSemester(spot: number): number {
    let lowerboundary: number;
    lowerboundary = 0;
    let upperboundary: number;
    upperboundary = 0;

    for (let i = 0; i < this.table.length; i++) {
      for (let j = 0; j < this.table[i].qualifications_overview_semesters.length; j++) {
        this.table[i].qualifications_overview_semesters[j].qualifications_modules.forEach( modules => {
          upperboundary += modules.learning_goals.length;
        });
        if (spot >= lowerboundary && spot < upperboundary) {
          return this.table[i].qualifications_overview_semesters[j].semester;
        }
        lowerboundary = upperboundary;
      }
    }
    return -1;
  }
  getSemesterRowSpan(spot: number) {
    const selectedsemester = this.getSemester(spot);
    const level = this.getSkillLevel(spot);
    let rowspan: number;
    rowspan = 0;
    this.table.forEach( overview => {
      overview.qualifications_overview_semesters.forEach( semester => {
        semester.qualifications_modules.forEach( module => {
            if (semester.semester === selectedsemester && level === overview.skills_level) {
              rowspan += module.learning_goals.length;
            }
          });
        });
      });
   return rowspan;
  }
  semesterLoaded(spot: number): boolean {
    const semester = this.getSemester(spot);
    if (this.skilllevelchanged && this.lastloadedsemester === semester) {
      return true;
    }
    if (this.lastloadedsemester === semester ) {
      return false;
    }
    this.lastloadedsemester = semester;
    return true;
  }
  // the following five methods calculates the value and rowspan of the educational unit and credits part of the table.
  getModule(spot: number): QualificationsModule {
    let count: number;
    let mod: QualificationsModule;
    count = 0;
    this.table.forEach(overview => {
      overview.qualifications_overview_semesters.forEach( semester => {
        semester.qualifications_modules.forEach( module => {
          module.learning_goals.forEach( lg => {
            if (count === spot) {
              mod = module;
            }
            count++;
          });
        });
      });
    });

    return mod;

  }
  moduleLoaded(spot: number): boolean {
    const mdlcode = this.getModuleCode(spot);
    if (this.skilllevelchanged && this.lastloadedmodulecode === mdlcode) {
      this.skilllevelchanged = false;
      return true;
    }
    if (this.lastloadedmodulecode === mdlcode) {
      return false;
    }
    this.skilllevelchanged = false;
    this.lastloadedmodulecode = mdlcode;
    return true;
  }
  getModuleRowSpan(spot: number) {
    const mdlcode = this.getModuleCode(spot);
    let rowspan: number;
    rowspan = 0;
    const level = this.getSkillLevel(spot);
    this.table.forEach( overview => {
      overview.qualifications_overview_semesters.forEach( semester => {
        semester.qualifications_modules.forEach( module => {
          if (module.module_code === mdlcode && level === overview.skills_level) {
            rowspan += module.learning_goals.length;
          }
        });
      });
    });
    return rowspan;
  }
  getModuleCode(spot: number): string {
    const module = this.getModule(spot);
    if(module === null) {
      return '-1';
    }
    return this.getModule(spot).module_code;
  }
  getModuleCredits(spot: number): number {
    const module = this.getModule(spot);
    if(module === null) {
      return -1;
    }
    return this.getModule(spot).credits;
  }
  // gets the correct learning goal for the correct spot.
  getLearningGoal(spot: number): string {
    let count: number;
    let qlg: QualificationsLearningGoal;
    count = 0;
    this.table.forEach(overview => {
      overview.qualifications_overview_semesters.forEach( semester => {
        semester.qualifications_modules.forEach( module => {
          module.learning_goals.forEach( lg => {
            if (count === spot) {
              qlg = lg;
            }
            count++;
          });
        });
      });
    });
    return qlg.description;
  }

  ngAfterContentInit(): void {
    this.readytoload = false;
    this.skilllevelchanged = false;
    // -1 means something is not loaded. initializing the variables here
    this.lastloadedskilllevel = -1;
    this.lastloadedsemester = -1;
    this.lastloadedmodulecode = '-1';

    this.backendService.getQualifications()
      .subscribe(filter => {
        this.filter = filter;
        console.log(this.filter);
        return;
      });
  }
}
