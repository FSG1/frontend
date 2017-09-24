import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import {ButtonModule, InputTextModule, PanelModule, PasswordModule} from 'primeng/primeng';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    ButtonModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
