import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { Semester} from './models/semester'

@Injectable()
export class BackendMockupService{
  private headers = new Headers({'Content-type': 'application/json'})
  private semestersUrl = 'api/semesters';

  constructor(private http: Http) { }

  getSemesters(): Promise<Semester[]> {
    this.http.get(this.semestersUrl)
      .toPromise()
      .then(response => response.json().data as Semester[])
      .catch(this.handleError);
    return null;
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
