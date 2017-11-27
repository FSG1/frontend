import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md/index';



@NgModule({
  declarations: [
    NavComponent,
    ErrorComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    NavComponent,
    ErrorComponent,
    AuthComponent
  ],
  providers: [
  ],
})
export class UtilModule { }
