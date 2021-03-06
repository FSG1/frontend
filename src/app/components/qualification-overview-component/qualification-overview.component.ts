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

/**
 * This method represents the qualifications overview page
 */
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
  selectedCurriculum: number = 0;
  selectedArchitecturalLayer: number = 0;
  selectedLifecycleActivity: number = 0;

  private routeSubscription: Subscription;

  /**
   * some variables are initialized here to avoid errors on the html page.
   * @param {BackendService} backendService
   * @param {ActivatedRoute} route
   */
  constructor(private backendService: BackendService, private route: ActivatedRoute) {
    this.curricula = [];
    this.lifecycle_activities = [];
    this.architectural_layers = [];
    this.dataStructure = [];
  }

  /**
   * The filter are initialised here if there are any
   */
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

  /**
   * This method loads the table only if all filters are applied.
   */
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



  /**
   * This method loads the table from the endpoint
   */
  loadTable(): void {
    if (this.selectedCurriculum > 0 && this.selectedLifecycleActivity > 0 && this.selectedArchitecturalLayer > 0) {
      this.backendService.getQualificationTable(this.selectedCurriculum, this.selectedArchitecturalLayer, this.selectedLifecycleActivity)
        .subscribe(table => this.countTotalLearningGoals(table),
        () => this.dataStructure = []);
    }
  }

  /**
   * Create a datastructure which makes it easy to show a table
   */
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
  //#region get methods
  /**
   * This method searches through the curriculum and returns the corresponding curriculum name
   * @returns {string} selected curriculum name
   */
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

  /**
   * This method searches through the lifecycle activities and returns the name corresponding to the ID.
   * @returns {string} returns Lifecycle activity name
   */
  get selectedActivityName(): string {
    if (this.selectedLifecycleActivity > 0) {
      let selected = Number(this.selectedLifecycleActivity);
      let name = this.lifecycle_activities
        .filter(function (row) {return row.id === selected;})
        .map(function (row) { return row.name})
        .shift();

      if (name) {
        return name;
      }
    }
    return "Lifecycle Activity";
  }

  /**
   * This method searches through the architectural layers and returns the name corresponding to the ID.
   * @returns {string} Returns architectural layer name
   */
  get selectedArchitecturalLayerName(): string {
    if (this.selectedArchitecturalLayer > 0) {
      let selected = Number(this.selectedArchitecturalLayer);
      let name = this.architectural_layers
        .filter(function (row) {return row.id === selected;})
        .map(function (row) { return row.name})
        .shift();

      if (name) {
        return name;
      }
    }
    return "Architectural Layer";
  }


  /**
   * This method returns the spot of where the table currently is in.
   * @param {number} spot
   * @returns {number}
   */
  getSkillLevel(spot: number): number {
    return this.dataStructure[spot].overview.skills_level;
  }

  /**
   * This method gets the learning goal description
   */
  getModule(spot: number): QualificationsModule {
    return this.dataStructure[spot].module;
  }
  //#endregion

  /**
   * the following two methods calculates the value and rowspan of the skill level part of the table.
   * This is needed if one wants one vertical cell insteadof multiple  vertical cells.
   */
  //#region Rowspan methods
  /**
   *This method gets the rowspan of the skill level
   */
  getSkillLevelRowSpan(spot: number): number {
    return this.dataStructure[spot].overview.qualifications_overview_semesters.map(function(semester) {
      return semester.qualifications_modules.map(function (module) {
        return module.learning_goals.length;
      }).reduce((acc, val) => (acc + val), 0);
    }).reduce((acc, val) => (acc + val), 0);
  }

  /**
   *This method gets the semester of the skill levels
   */
  getSemesterRowSpan(spot: number) {
    return this.dataStructure[spot].semester.qualifications_modules.map(function (module) {
      return module.learning_goals.length;
    }).reduce((acc, val) => (acc + val), 0);
  }

  /**
   *This method gets the rowspan of the module
   */
  getModuleRowSpan(spot: number) {
    return this.getModule(spot).learning_goals.length;
  }
  //#endregion

  /**
   * The following three method's check if the the item is equal to the previous item.
   * This is needed if one wants one vertical cell insteadof multiple  vertical cells.
   */
  //#region check if loaded methods
  /**
   * This method checks if the skill level is already loaded
   */
  levelLoaded(spot: number): boolean {
    if (spot === 0) return true;

    let cur = this.dataStructure[spot];
    let previous = this.dataStructure[spot - 1];

    return !(cur.overview.skills_level === previous.overview.skills_level);
  }
  /**
   * This method checks if the semester is already loaded
   */
  semesterLoaded(spot: number): boolean {
    if (spot === 0) return true;

    let cur = this.dataStructure[spot];
    let previous = this.dataStructure[spot - 1];

    return !(
      cur.overview.skills_level === previous.overview.skills_level && cur.semester.semester === previous.semester.semester
    );
  }
  /**
   * This method checks if the module is already loaded
   */
  moduleLoaded(spot: number): boolean {
    if (spot === 0) return true;
    let cur = this.dataStructure[spot];
    let previous = this.dataStructure[spot - 1];

    return !(
      cur.overview.skills_level === previous.overview.skills_level && cur.semester.semester === previous.semester.semester && cur.module.code === previous.module.code
    );
  }
  //#endregion
}
