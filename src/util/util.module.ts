import { NgModule } from '@angular/core';

import { NavComponent } from './nav/nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    ErrorComponent
  ],
  providers: [
  ],
})
export class UtilModule { }
