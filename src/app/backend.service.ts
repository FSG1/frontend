import {Injectable} from '@angular/core';

import { Semester } from './models/semester.model';
import { Curriculum } from './models/curriculum.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import {CurriculumResponse} from './backend-responses/CurriculumResponse';
import {ModuleContent} from './models/modulecontent.model';

@Injectable()
export class BackendService {
  private curriculaUrl = 'http://172.17.0.1:8080/fmms/curricula';

  constructor(private http: HttpClient) {
  }

  getModuleContent(curriculum: number, code: string): Observable<ModuleContent> {
    const moduleContentUrl = 'http://172.17.0.1:8080/fmms/curriculum/' + curriculum + '/modules/' + code;
    return this.http.get<ModuleContent>(moduleContentUrl);
  }

  getCurricula(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.curriculaUrl);
  }

  getSemesters(id: number): Observable<Semester[]> {
    const semestersUrl = 'http://172.17.0.1:8080/fmms/curriculum/' + id + '/semesters';
    return this.http.get<CurriculumResponse>(semestersUrl)
      .map(data => data.semesters);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
