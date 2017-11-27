import {Injectable} from '@angular/core';

import { Semester } from './models/semester.model';
import { Curriculum } from './models/curriculum.model';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';
import {CurriculumResponse} from './backend-responses/CurriculumResponse';
import {ModuleContent} from './models/modulecontent.model';
import {CompleteSemester} from './models/complete_semester.model';
import {Subscriber} from 'rxjs/Subscriber';
import {FilterQualifications} from './models/qualificiationfiltermodels/filter_qualifications.model';
import {QualificationsOverview} from './models/qualificiationfiltermodels/qualifications_overview.model';
import {environment} from '../environments/environment';
import {EditableModuleOutput} from './models/editmodels/editable_module_output';
import {EditableModuleInput} from './models/editmodels/editable_module_input';
import {AppComponent} from "./app.component";

const outputmockup = {
  'code': 'DBS',
  'name': 'Databases',
  'credits': 5,
  'semester': 1,
  'lectures_in_week': 3,
  'practical_hours_week': 4,
  'introductorytext': 'very nice module. everyone should follow it',
  'topics': ['drinking beer', 'sql injection', 'otherstuff'],
  'teaching_material': [{
    'name': 'dbs book',
    'type': 'book'
  }, {
    'name': 'dbs book 2',
    'type': 'book'
  }, {
    'name': 'www.something.com',
    'type': 'website'
  }],
  'teaching_material_types': ['book', 'website', 'physical'],
  'additional_information': 'vey nice course',
  'all_lecturers': [{
    'id': 1,
    'name': 'Dorssers, T',
  }, {
    'id': 2,
    'name': 'Van Odenhoven, F',
  }, {
    'id': 5,
    'name': 'Van der Ham, R',
  }],
  'active_lecturers': [{
    'id': 1,
    'name': 'Dorssers, T',
  }, {
    'id': 2,
    'name': 'Van Odenhoven, F',
  }],
  'credentials': 'vey nice course'
};

@Injectable()
export class BackendService {
  constructor(private http: HttpClient, private app: AppComponent) {
  }

  getSemester(curriculum: number, semester: number): Observable<CompleteSemester> {
    return this.get<CompleteSemester>('curriculum/' + curriculum + '/semester/' + semester);
  }

  // endpoint doesn't exist yet
  getEditableModule(modulecode: string): Observable<EditableModuleOutput> {
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(outputmockup);
      observer.complete();
    });
    // return this.get<EditableModuleOutput>('module/' + modulecode);
  }

  // endpoint does not exist yet
  updateEditableModule(modulecode: string, input: EditableModuleInput): void {
    const editablemoduleinputurl = this.getBaseUrl() + 'module/' + modulecode;
    // Please use this.post
  }

  getQualifications(): Observable<FilterQualifications> {
    return this.get<FilterQualifications>('qualifications');
  }

  getQualificationTable(curriculum: number, architecturallayer: number, activity: number): Observable<QualificationsOverview[]> {
    const qualificationtableUrl = 'curriculum/'
      + curriculum
      + '/architecturallayer/'
      + architecturallayer
      + '/activity/'
      + activity;
    return this.get<QualificationsOverview[]>(qualificationtableUrl);
  }

  getModuleContent(curriculum: number, code: string): Observable<ModuleContent> {
    return this.get<ModuleContent>('curriculum/' + curriculum + '/module/' + code);
  }

  getCurricula(): Observable<Curriculum[]> {
    const curriculaUrl = this.getBaseUrl() + 'curricula';
    return this.http.get<Curriculum[]>(curriculaUrl);
  }

  getSemesters(id: number): Observable<Semester[]> {
    return this.get<CurriculumResponse>('curriculum/' + id + '/semesters')
      .map(data => data.semesters);
  }

  // Test if authentication works or not
  testAuth(username: string, password: string): Observable<boolean> {
    return Observable.create((observer) => {
      const encoded = btoa(username + ':' + password);
      const headers = new HttpHeaders().set('Authorization', 'Basic ' + encoded);

      this.http.get(this.getBaseUrl() + 'restricted/auth', {headers: headers})
        .subscribe(() => {
          observer.next(true);
        },
          () => {
            observer.next(false);
        });
    });
  }

  private get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.getBaseUrl() + url, this.getOptions());
  }

  private post<T>(url: string, params: any): Observable<T> {
    return this.http.post<T>(this.getBaseUrl() + url, params, this.getOptions());
  }

  private getOptions(): object {
    const options = {
      headers: new HttpHeaders()
    };
    if (this.app.isLoggedIn) {
      const credentials = this.app.username + ':' + this.app.password;
      const encoded = btoa(credentials);
      options.headers.append('Authorization', 'Basic ' + encoded);
    }
    return options;
  }

  private getBaseUrl(): string {
    let url = environment.backend.scheme
          + '://'
          + environment.backend.host;

    if (environment.backend.port !== null && environment.backend.port > 0) {
      url += ':' + environment.backend.port;
    }

    url += '/' + environment.backend.base + '/';

    return url;
  }
}
