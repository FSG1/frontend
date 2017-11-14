import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from '../util/error/error.component';
import {ModuleComponent} from './components/module-component/module.component';
import {ModuleOverviewComponent} from './components/module-overview-component/module-overview.component';
import {SemesterOverviewComponent} from './components/semester-overview-component/semester-overview.component';
import {QualificationOverviewComponent} from './components/qualification-overview-component/qualification-overview.component';
import {environment} from '../environments/environment';

const routes: Routes = [
  {
    path: 'moduleoverview',
    component: ModuleOverviewComponent
  },
  {
    path: 'moduleoverview/:curriculum',
    component: ModuleOverviewComponent
  },
  {
    path: 'curriculum/:curriculum/modules/:code',
    component: ModuleComponent
  },
  {
    path: 'curriculum/:curriculum/semesters/:semester',
    component: SemesterOverviewComponent
  }, {
    path: 'qualifications',
    component: QualificationOverviewComponent
  },
  {
    path: '',
    redirectTo: '/moduleoverview',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent
  }
];


/*
Disable tracing in production
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: (!environment.production)})
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
