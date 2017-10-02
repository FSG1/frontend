import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';

import { BackendMockupService }          from './backend.mockup.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [ BackendMockupService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
