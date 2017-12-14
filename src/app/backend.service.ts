import {Injectable} from '@angular/core';

import { Semester } from './models/semester.model';
import { Curriculum } from './models/curriculum.model';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';
import {CurriculumResponse} from './backend-responses/CurriculumResponse';
import {ModuleContent} from './models/modulecontent.model';
import {CompleteSemester} from './models/complete_semester.model';
import {FilterQualifications} from './models/qualificiationfiltermodels/filter_qualifications.model';
import {QualificationsOverview} from './models/qualificiationfiltermodels/qualifications_overview.model';
import {environment} from '../environments/environment';
import {EditableModuleOutput} from './models/editmodels/editable_module_output';
import {EditableModuleInput} from './models/editmodels/editable_module_input';
import {AppComponent} from "./app.component";
import {Subscriber} from 'rxjs/Subscriber';
const outputmockup = {
  'id': 1,
  'code': 'DBS',
  'name': 'Databases',
  'credits': 5,
  'semesters': [1, 2],
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
  'credentials': 'vey nice course',
  'project_flag': false,
  'learning_goals': [
    {
      'name': 'LG 1',
      'description': 'apply control structures, function invocation and memory management in C ',
      'type': 'personal',
      'skillmatrix': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
        {'lifecycle_activity': 2, 'architectural_layer': 3, 'level': 1}],
      'assesment_types': null,
      'weight': null
    },
    {
      'name': 'LG 2',
      'description': 'apply object orientation and memory management in C++ managed and unmanaged',
      'type': 'personal',
      'skillmatrix': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1}],
      'assesment_types': null,
      'weight': null
    },
    {
      'name': 'LG 3',
      'description': 'apply C++11 and C++14 extensions of C++',
      'type': 'personal',
      'skillmatrix': [{'lifecycle_activity': 3, 'architectural_layer': 1, 'level': 2}],
      'assesment_types': null,
      'weight': null
    },
    {
      'name': 'LG 4',
      'description': 'do group stuff',
      'type': 'group',
      'skillmatrix': [{'lifecycle_activity': 0, 'architectural_layer': 0, 'level': 3}],
      'assesment_types': null,
      'weight': null
    }
  ]
};

const filterqualifications = {
  'curricula': [
    { 'name': 'Software Engineering', 'code': 'SE', 'id': 1},
    { 'name': 'Business Informatics', 'code': 'BI', 'id': 2}],
  'lifecycle_activities': [{'id': 0, 'name': 'Manage', 'description': 'something'},
    {'id': 1, 'name': 'Analyze', 'description': 'something'},
    {'id': 2, 'name': 'Advice', 'description': 'something'},
    {'id': 3, 'name': 'Design', 'description': 'something'}],
  'architectural_layers': [{'id': 0, 'architectural_layer_name': 'User Interaction', 'description': 'something'},
    {'id': 1, 'name': 'Business Processes', 'description': 'something'},
    {'id': 2, 'name': 'Infrastructure', 'description': 'something'},
    {'id': 3, 'name': 'software', 'description': 'something'}],
};
@Injectable()
export class BackendService {
  constructor(private http: HttpClient, private app: AppComponent) {
  }

  getSemester(curriculum: number, semester: number): Observable<CompleteSemester> {
    return this.get<CompleteSemester>('curriculum/' + curriculum + '/semester/' + semester);
  }

  getEditableModule(modulecode: string): Observable<EditableModuleOutput> {
     return this.get<EditableModuleOutput>('module/' + modulecode);
  }

  // endpoint does not exist yet
  updateEditableModule(moduleid: number, input: EditableModuleInput): Observable<any> {
    return this.post('module/' + moduleid, input);
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

      this.http.post(this.getBaseUrl() + 'auth', {}, {headers: headers})
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
      const encoded = btoa(this.app.username + ':' + this.app.password);
      options.headers = new HttpHeaders().set('Authorization', 'Basic ' + encoded);
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
