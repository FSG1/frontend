///<reference path="../../models/qualificiationfiltermodels/qualifications_module.ts"/>
import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Curriculum} from '../../models/curriculum.model';
import {LifecycleActivity} from '../../models/lifecycleactivity';
import {ArchitecturalLayer} from '../../models/architecturallayer';
import {BackendService} from '../../backend.service';
import {QualificationsOverview} from '../../models/qualificiationfiltermodels/qualifications_overview.model';
import {QualificationsModule} from '../../models/qualificiationfiltermodels/qualifications_module';
import {QualificationsLearningGoal} from '../../models/qualificiationfiltermodels/qualifications_learning_goal.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {QualificationsOverviewSemester} from "../../models/qualificiationfiltermodels/qualifications_overview_semester.model";

interface TableStructure {
  index: number,
  overview: QualificationsOverview,
  semester: QualificationsOverviewSemester,
  module: QualificationsModule,
  lg: QualificationsLearningGoal
}

@Component({
  selector: 'app-qualification-overview',
  templateUrl: './qualification-overview.component.html',
  styleUrls: ['./qualification-overview.component.scss']
})
export class QualificationOverviewComponent implements AfterContentInit, OnInit, OnDestroy {
  curricula: Curriculum[];
  lifecycle_activities: LifecycleActivity[];
  architectural_layers: ArchitecturalLayer[];

  dataStructure: TableStructure[];
  table: QualificationsOverview[];
  selectedCurriculum: number = 0;
  selectedArchitecturalLayer: number = 0;
  selectedLifecycleActivity: number = 0;

  private routeSubscription: Subscription;

  constructor(private backendService: BackendService, private route: ActivatedRoute) {
    this.curricula = [];
    this.lifecycle_activities = [];
    this.architectural_layers = [];
  }

  ngOnInit() {
    this.backendService.getQualifications()
      .subscribe(filter => {
        this.curricula = filter.curricula;
        this.lifecycle_activities = filter.lifecycle_activities;
        this.architectural_layers = filter.architectural_layers;
      });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  ngAfterContentInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params["curriculum"]) {
        this.selectedCurriculum = params["curriculum"];
      }

      if (params["lifecycle_activity"]) {
        this.selectedLifecycleActivity = params["lifecycle_activity"];
      }

      if (params["architectural_layer"]) {
        this.selectedArchitecturalLayer = params["architectural_layer"];
      }
      this.loadTable();
    });
  }

  get selectedCurriculumName(): string {
    if (this.selectedCurriculum > 0) {
      let selected = Number(this.selectedCurriculum);
      let name = this.curricula
        .filter(function (row) {return row.id === selected;})
        .map(function (row) { return row.name})
        .shift();

      if (name) {
        return name;
      }
    }
    return "Curriculum";
  }

  get selectedActivityName(): string {
    if (this.selectedLifecycleActivity > 0) {
      let selected = Number(this.selectedLifecycleActivity);
      let name = this.lifecycle_activities
        .filter(function (row) {return row.lifecycle_activity_id === selected;})
        .map(function (row) { return row.lifecycle_activity_name})
        .shift();

      if (name) {
        return name;
      }
    }
    return "Lifecycle Activity";
  }

  get selectedArchitecturalLayerName(): string {
    if (this.selectedArchitecturalLayer > 0) {
      let selected = Number(this.selectedArchitecturalLayer);
      let name = this.architectural_layers
        .filter(function (row) {return row.architectural_layer_id === selected;})
        .map(function (row) { return row.architectural_layer_name})
        .shift();

      if (name) {
        return name;
      }
    }
    return "Architectural Layer";
  }

  loadTable(): void {
    if (this.selectedCurriculum > 0 && this.selectedLifecycleActivity > 0 && this.selectedArchitecturalLayer > 0) {
      this.backendService.getQualificationTable(this.selectedCurriculum, this.selectedArchitecturalLayer, this.selectedLifecycleActivity)
        .subscribe(table => {
          this.table = table;
          return this.countTotalLearningGoals(this.table);
        });
    }
  }

  // Create a datastructure which makes it easy to show a table
  countTotalLearningGoals(overview: QualificationsOverview[]): void {
    let ds: TableStructure[] = [];
    let i = 0;
    overview.forEach(function (overview) {
      overview.qualifications_overview_semesters.forEach(function(semester) {
        semester.qualifications_modules.forEach(function (module) {
          module.learning_goals.forEach(function (lg) {
            ds[i] = {
              index: i,
              overview: overview,
              semester: semester,
              module: module,
              lg: lg
            };
            i++;
          });
        });
      });
    });
    this.dataStructure = ds;
  }

  // the following three methods calculates the value and rowspan of the skill level part of the table.
  getSkillLevel(spot: number): number {
    return this.dataStructure[spot].overview.skills_level;
  }

  getSkillLevelRowSpan(spot: number): number {
    return this.dataStructure[spot].overview.qualifications_overview_semesters.map(function(semester) {
      return semester.qualifications_modules.map(function (module) {
        return module.learning_goals.length;
      }).reduce((acc, val) => (acc + val), 0);
    }).reduce((acc, val) => (acc + val), 0);
  }

  levelLoaded(spot: number): boolean {
    if (spot === 0) return true;

    let cur = this.dataStructure[spot];
    let previous = this.dataStructure[spot - 1];

    return !(cur.overview.skills_level === previous.overview.skills_level);
  }

  getSemesterRowSpan(spot: number) {
    return this.dataStructure[spot].semester.qualifications_modules.map(function (module) {
      return module.learning_goals.length;
    }).reduce((acc, val) => (acc + val), 0);
  }

  semesterLoaded(spot: number): boolean {
    if (spot === 0) return true;

    let cur = this.dataStructure[spot];
    let previous = this.dataStructure[spot - 1];

    return !(
      cur.overview.skills_level === previous.overview.skills_level && cur.semester.semester === previous.semester.semester
    );
  }

  // the following five methods calculates the value and rowspan of the educational unit and credits part of the table.
  getModule(spot: number): QualificationsModule {
    console.log(spot);
    return this.dataStructure[spot].module;
  }

  moduleLoaded(spot: number): boolean {
    if (spot === 0) return true;
    let cur = this.dataStructure[spot];
    let previous = this.dataStructure[spot - 1];

    return !(
      cur.overview.skills_level === previous.overview.skills_level && cur.semester.semester === previous.semester.semester && cur.module.module_code === previous.module.module_code
    );
  }

  getModuleRowSpan(spot: number) {
    return this.getModule(spot).learning_goals.length;
  }
}
