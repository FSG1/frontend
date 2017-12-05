import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from '../util/error/error.component';
import {ModuleComponent} from './components/module-component/view/module.component';
import {ModuleOverviewComponent} from './components/module-overview-component/module-overview.component';
import {SemesterOverviewComponent} from './components/semester-overview-component/semester-overview.component';
import {QualificationOverviewComponent} from './components/qualification-overview-component/qualification-overview.component';
import {environment} from '../environments/environment';
import {ModuleEditComponent} from './components/module-component/edit/module-edit.component';
import {AuthComponent} from '../util/auth/auth.component';

const routes: Routes = [
  {
    path: 'moduleoverview',
    component: ModuleOverviewComponent,
    pathMatch: 'full'
  },
  {
    path: 'moduleoverview/:curriculum',
    component: ModuleOverviewComponent,
    pathMatch: 'full'
  },
  {
    path: 'curriculum/:curriculum/modules/:code',
    component: ModuleComponent,
    pathMatch: 'full'
  },
  {
    path: 'curriculum/:curriculum/semesters/:semester',
    component: SemesterOverviewComponent,
    pathMatch: 'full'
  },
  {
    path: 'modifymodule/:module_code',
    component: ModuleEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent,
    pathMatch: 'full',
    data: {
      logout: false
    }
  },
  {
    path: 'logout',
    component: AuthComponent,
    pathMatch: 'full',
    data: {
      logout: true
    }
  },
  {
    path: 'qualifications',
    component: QualificationOverviewComponent,
    pathMatch: 'full'
  },
  {
    path: 'qualifications/:curriculum',
    component: QualificationOverviewComponent,
    pathMatch: 'full'
  },
  {
    path: 'qualifications/:curriculum/:lifecycle_activity',
    component: QualificationOverviewComponent,
    pathMatch: 'full'
  },
  {
    path: 'qualifications/:curriculum/:lifecycle_activity/:architectural_layer',
    component: QualificationOverviewComponent,
    pathMatch: 'full'
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
    RouterModule.forRoot(routes, {enableTracing: (!environment.production) && false})
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
