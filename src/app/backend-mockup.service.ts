import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Semesters } from './module-overview/semesters.model';

@Injectable()
export class BackendMockupService {
  private headers = new Headers({'Content-type': 'application/json'});
  private semestersUrl = 'api/semesters';

  constructor(private http: Http) { }

  getSemesters(): Promise<Semesters[]> {
    return this.http.get(this.semestersUrl)
      .toPromise()
      .then(response => response.json().data as Semesters[])
      .catch(this.handleError);

  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
