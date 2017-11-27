import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {UtilModule} from '../util/util.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app.routing';
import { ModuleOverviewComponent } from './components/module-overview-component/module-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { SkillMatrixComponent } from './components/skillmatrix-component/skillmatrix.component';

import { BackendService } from './backend.service';
import {ModuleComponent} from './components/module-component/view/module.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {ExamLGComponent} from './components/examlg-component/examlg.component';
import {SemesterOverviewComponent} from './components/semester-overview-component/semester-overview.component';
import {QualificationOverviewComponent} from './components/qualification-overview-component/qualification-overview.component';
import {ModuleEditComponent} from './components/module-component/edit/module-edit.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ModuleOverviewComponent,
    ModuleComponent,
    ExamLGComponent,
    SkillMatrixComponent,
    SemesterOverviewComponent,
    QualificationOverviewComponent,
    ModuleEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UtilModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [BackendService, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
