import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import { SEMESTERS} from './mock-semester';

import 'rxjs/add/operator/toPromise';

import { Semester} from './semester';

@Injectable()
export class BackendMockupService {
  private headers = new Headers({'Content-type': 'application/json'});
  private semestersUrl = 'api/semesters';

  constructor(private http: Http) { }

  getSemesters(): Promise<Semester[]> {
    return Promise.resolve(SEMESTERS);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
