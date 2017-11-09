import {AfterContentInit, Component} from '@angular/core';
import {FilterQualifications} from '../../models/qualificiationfiltermodels/filter_qualifications.model';
import {Curriculum} from '../../models/curriculum.model';
import {LifecycleActivity} from '../../models/lifecycleactivity';
import {ArchitecturalLayer} from '../../models/architecturallayer';
import {BackendService} from '../../backend.service';
import {QualificationsOverview} from '../../models/qualificiationfiltermodels/qualifications_overview.model';

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
  }

  ngAfterContentInit(): void {
    this.readytoload = false;
    this.backendService.getQualifications()
      .subscribe(filter => this.filter = filter);
  }
}
