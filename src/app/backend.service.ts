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

// Only here until endpoint is implemented
const mocksemester = {
  'curriculum_name': 'software business',
  'modules': [
    {'module_code': 'JAV1',        'module_name': 'Programming in Java 1',       'credits': 5 },
    {'module_code': 'DBS1',         'module_name': 'Databases',       'credits': 5 },
    {'module_code': 'BUA',         'module_name': 'Business Administration',       'credits': 4 },
    {'module_code': 'MAT1',        'module_name': 'Mathematics 1',       'credits': 4 },
    {'module_code': 'ENG1',        'module_name': 'English 1',       'credits': 1 },
    {'module_code': 'PRJ1',        'module_name': 'Project 1',       'credits': 10 },
    {'module_code': 'COM1',        'module_name': 'Communication 1',       'credits': 2 }
  ],
  'qualifications': [{'lifecycle_activity': 1, 'architectural_layer': 3, 'level': 1},
    {'lifecycle_activity': 2, 'architectural_layer': 3, 'level': 2}],
  'architectural_layers': [{'architectural_layer_id': 0, 'architectural_layer_name': 'User Interaction', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 1, 'architectural_layer_name': 'Business Processes', 'Architectural_layer_description': 'something'},
    {'architectural_layer_id': 2, 'architectural_layer_name': 'Infrastructure', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 3, 'architectural_layer_name': 'software', 'architectural_layer_description': 'something'}],
  'lifecycle_activities': [{'lifecycle_activity_id': 0, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 1, 'lifecycle_activity_name': 'Analyze', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 2, 'lifecycle_activity_name': 'Advice', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 3, 'lifecycle_activity_name': 'Design', 'lifecycle_activity_description': 'something'}]
};
const filterqualifications = {
  'curricula': [
    { 'name': 'Software Engineering', 'code': 'SE', 'id': 1},
    { 'name': 'Business Informatics', 'code': 'BI', 'id': 2}],
  'lifecycle_activities': [{'lifecycle_activity_id': 0, 'lifecycle_activity_name': 'Manage', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 1, 'lifecycle_activity_name': 'Analyze', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 2, 'lifecycle_activity_name': 'Advice', 'lifecycle_activity_description': 'something'},
    {'lifecycle_activity_id': 3, 'lifecycle_activity_name': 'Design', 'lifecycle_activity_description': 'something'}],
  'architectural_layers': [{'architectural_layer_id': 0, 'architectural_layer_name': 'User Interaction', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 1, 'architectural_layer_name': 'Business Processes', 'Architectural_layer_description': 'something'},
    {'architectural_layer_id': 2, 'architectural_layer_name': 'Infrastructure', 'architectural_layer_description': 'something'},
    {'architectural_layer_id': 3, 'architectural_layer_name': 'software', 'architectural_layer_description': 'something'}],
};
const mockqualificationtable = [{
  'skills_level': 1,
  'qualification_overview_semesters': [
    {'semester': 1,
      'qualifications_modules': [
        {
          'module_code': 'BUA',
          'module_name': 'Business informatics',
          'credits': 4,
          'learning_goals': [
            {
              'name': 'lg1',
              'description': 'blablabla'
            }, {
              'name': 'lg2',
              'description': 'blablabla'
            }]
        }, {
          'module_code': 'JAV1',
          'module_name': 'Java 1',
          'credits': 5,
          'learning_goals': [
            {
              'name': 'lg3',
              'description': 'blablabla'
            }, {
              'name': 'lg4',
              'description': 'blablabla'
            }, {
              'name': 'lg5',
              'description': 'blablabla'
            }]
        }, {
          'module_code': 'DBS',
          'module_name': 'Databases',
          'credits': 5,
          'learning_goals': [
            {
              'name': 'lg6',
              'description': 'blablabla'
            }]
        }]
    },
    {'semester': 3,
      'qualifications_modules': [
        {
          'module_code': 'BUMA',
          'module_name': 'Business management',
          'credits': 5,
          'learning_goals': [
            {
              'name': 'lg7',
              'description': 'blablabla'
            }, {
              'name': 'lg8',
              'description': 'blablabla'
            }, {
              'name': 'lg9',
              'description': 'blablabla'
            }]
        }, {
          'module_code': 'COM3',
          'module_name': 'Communicatie 3',
          'credits': 1,
          'learning_goals': [
            {
              'name': 'lg10',
              'description': 'blablabla'
            }, {
              'name': 'lg11',
              'description': 'blablabla'
            }]
        }]},
    {'semester': 7,
      'qualifications_modules': [{
        'module_code': 'SOFA',
        'module_name': 'Software factorio',
        'credits': 15,
        'learning_goals': [
          {
            'name': 'lg12',
            'description': 'blablabla'
          }]
      }]
    }]},  {
  'skills_level': 2,
  'qualification_overview_semesters': [
    {'semester': 2,
      'qualifications_modules': [
        {
          'module_code': 'etc',
          'module_name': 'etc',
          'credits': 15,
          'learning_goals': [
            {
              'name': 'lg4',
              'description': 'blablabla'
            }, {
              'name': 'lg5',
              'description': 'blablabla'
            }, {
              'name': 'lg6',
              'description': 'blablabla'
            }]
        }]
    },
    {'semester': 4,
      'qualifications_modules': [{
        'module_code': 'etc',
        'module_name': 'etc',
        'credits': 1,
        'learning_goals': [
          {
            'name': 'lg4',
            'description': 'blablabla'
          }, {
            'name': 'lg5',
            'description': 'blablabla'
          }, {
            'name': 'lg6',
            'description': 'blablabla'
          }]
      }
      ]}]
}];



// WINDOWS IP:192.168.99.100
// LINUX IP: 172.17.0.1

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) {
  }
  // endpoint does not exist yet
  getSemester(curriculum: number, semester: number): Observable<CompleteSemester> {
    const completeSemesterUrl = 'http://192.168.99.100:8080/fmms/curriculum/' + curriculum + '/semesters/' + semester;
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(mocksemester);
      observer.complete();
    });
  }

  // endpoint does not exist yet
  getQualifications(): Observable<FilterQualifications> {
    const filterqualificationsUrl = 'http://192.168.99.100:8080/fmms/qualifications';
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(filterqualifications);
      observer.complete();
    });
  }
  // endpoint does not exist yet
  getQualificationTable(curriculum: number, architecturallayer: number, activity: number): Observable<QualificationsOverview[]> {
    const qualificationtableUrl = 'http://192.168.99.100:8080/fmms/curriculum/' + curriculum + '/architecturallayer/' + architecturallayer + '/activity/' + activity;
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(mockqualificationtable);
      observer.complete();
    });
  }

  getModuleContent(curriculum: number, code: string): Observable<ModuleContent> {
    const moduleContentUrl = 'http://192.168.99.100:8080/fmms/curriculum/' + curriculum + '/modules/' + code;
    return this.http.get<ModuleContent>(moduleContentUrl);
  }

  getCurricula(): Observable<Curriculum[]> {
    const curriculaUrl = 'http://192.168.99.100:8080/fmms/curricula';
    return this.http.get<Curriculum[]>(curriculaUrl);
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
