import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UtilModule} from '../util/util.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app.routing';
import { ModuleOverviewComponent } from './module-overview-component/module-overview.component';
import { HttpClientModule } from '@angular/common/http';

import { HttpModule } from '@angular/http';

// In memory imports
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-db/in-memory-data.service';
import { BackendService } from './backend.service';


@NgModule({
  declarations: [
    AppComponent,
    ModuleOverviewComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    HttpModule,
    UtilModule,
    AppRoutingModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [ BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
