import {Injectable} from '@angular/core';

import { Semester } from './models/semester.model';
import { Curriculum } from './models/curriculum.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {
  }
  //#region endpoints
  getSemester(curriculum: number, semester: number): Observable<CompleteSemester> {
    const completeSemesterUrl = this.getBaseUrl() + 'curriculum/' + curriculum + '/semester/' + semester;
    return this.http.get<CompleteSemester>(completeSemesterUrl);
  }
  // endpoint doesn't exist yet
  getEditableModule(modulecode: string): Observable<EditableModuleOutput> {
   const editablemoduleoutputurl = this.getBaseUrl() + 'module/' + modulecode;
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(outputmockup);
      observer.complete();
    });
  }
  // endpoint does not exist yet
  updateEditableModule(modulecode: string, input: EditableModuleInput): void {
    const editablemoduleinputurl = this.getBaseUrl() + 'module/' + modulecode;
  }
  getQualifications(): Observable<FilterQualifications> {
    const filterqualificationsUrl = this.getBaseUrl() + 'qualifications';
    return this.http.get<FilterQualifications>(filterqualificationsUrl);
  }
  getQualificationTable(curriculum: number, architecturallayer: number, activity: number): Observable<QualificationsOverview[]> {
    const qualificationtableUrl = this.getBaseUrl() + 'curriculum/' + curriculum + '/architecturallayer/' + architecturallayer + '/activity/' + activity;
    return this.http.get<QualificationsOverview[]>(qualificationtableUrl);
  }
  getModuleContent(curriculum: number, code: string): Observable<ModuleContent> {
    const moduleContentUrl = this.getBaseUrl() + 'curriculum/' + curriculum + '/module/' + code;
    return this.http.get<ModuleContent>(moduleContentUrl);
  }

  getCurricula(): Observable<Curriculum[]> {
    const curriculaUrl = this.getBaseUrl() + 'curricula';
    return this.http.get<Curriculum[]>(curriculaUrl);
  }

  getSemesters(id: number): Observable<Semester[]> {
    const semestersUrl = this.getBaseUrl() + 'curriculum/' + id + '/semesters';
    return this.http.get<CurriculumResponse>(semestersUrl)
      .map(data => data.semesters);
  }
  //#endregion
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
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
