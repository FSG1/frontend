import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {UtilModule} from '../util/util.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app.routing';
import { ModuleOverviewComponent } from './components/module-overview-component/module-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { SkillMatrixComponent } from './components/skillmatrix-component/skillmatrix.component';

import { HttpModule } from '@angular/http';

import { BackendService } from './backend.service';
import {ModuleComponent} from './components/module-component/module.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    ModuleOverviewComponent,
    ModuleComponent,
    SkillMatrixComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    UtilModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
