import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Semester } from './models/semester.model';

@Injectable()
export class BackendService {
  private headers = new Headers({'Content-type': 'application/json'});
  private semestersUrl = 'api/semesters';

  constructor(private http: Http) { }

  getSemesters(): Promise<Semester[]> {
    return this.http.get(this.semestersUrl)
      .toPromise()
      .then(response => response.json().data as Semester[])
      .catch(this.handleError);

  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
