import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curriculum } from './curriculum.model';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss']
})
export class ModuleOverviewComponent implements OnInit {
  result: Curriculum;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.http.get<CurriculumOverview>('url').subscribe(data => {
    //  this.result = data['modules'];
    // });
  }

}
