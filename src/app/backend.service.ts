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
  private curriculaUrl = 'http://192.168.99.100:8080/fmms/curricula';

  constructor(private http: HttpClient) {
  }

  // needs to return something in the future, implemented it for testing purposes
  getModule(modulecode: string): Observable<ModuleContent[]> {
    return null;
  }

  getCurricula(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.curriculaUrl);
  }

  getSemesters(id: number): Observable<Semester[]> {
    const semestersUrl = 'http://192.168.99.100:8080/fmms/curriculum/' + id + '/semesters';
    return this.http.get<CurriculumResponse>(semestersUrl)
      .map(data => data.semesters);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
