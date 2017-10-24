import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from '../util/error/error.component';
import {ModuleComponent} from "./module-component/module.component";
import {SkillMatrixComponent} from "./skillmatrix-component/skillmatrix.component";

const routes: Routes = [
  {
    path: 'module',
    component: ModuleComponent
  },
  {
    path: '',
    redirectTo: '/module',
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
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
