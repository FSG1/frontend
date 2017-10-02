import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss']
})
export class ModuleOverviewComponent implements OnInit {
  result: CurriculumOverview[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<CurriculumOverview>('url', ).subscribe(data => {
      this.result = data['modules'];
    });
  }

}
