import { NgModule } from '@angular/core';

import { NavComponent } from './nav/nav.component';
import {BrowserModule} from '@angular/platform-browser';
import {ErrorComponent} from './error/error.component';
import {ApiClient} from "./ApiClient";
import {RouterModule} from "@angular/router";
import {LoaderComponent} from "./loader/loader.component";

@NgModule({
  declarations: [
    NavComponent,
    ErrorComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    ErrorComponent,
    LoaderComponent
  ],
  providers: [
    ApiClient
  ],
})
export class UtilModule { }
