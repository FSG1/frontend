import {Injectable} from '@angular/core';

import { Semester } from './models/semester.model';
import {CurriculumResponse} from './models/CurriculumResponse';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {
  private headers = new Headers({'Content-type': 'application/json'});
  private semestersUrl = 'http://172.17.0.1:8080/fmms/curriculum/BI/semesters';

  constructor(private http: HttpClient) { }

  getSemesters(): Observable<Semester[]> {
    return this.http.get<CurriculumResponse>(this.semestersUrl)
      .map(data => data.semesters);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
