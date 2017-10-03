import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UtilModule} from '../util/util.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app.routing';
import {LoginModule} from '../fmms/login/login.module';
import {StartModule} from '../fmms/start/start.module';

import { HttpModule } from '@angular/http';

// In memory imports
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

 import { BackendMockupService } from './backend-mockup.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    UtilModule,
    AppRoutingModule,
    LoginModule,
    StartModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [ BackendMockupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
