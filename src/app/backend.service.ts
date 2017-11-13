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

// Only here until endpoint is implemented
const mocksemester = {
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

// WINDOWS IP:192.168.99.100
// LINUX IP: 172.17.0.1

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) {
  }
  // endpoint does not exist yet
  getSemester(curriculum: number, semester: number): Observable<CompleteSemester>{
    const completeSemesterUrl = 'http://172.17.0.1:8080/fmms/curriculum/' + curriculum + '/semesters/' + semester;
    return this.http.get<CompleteSemester>(completeSemesterUrl);
  }

  getModuleContent(curriculum: number, code: string): Observable<ModuleContent> {
    const moduleContentUrl = 'http://172.17.0.1:8080/fmms/curriculum/' + curriculum + '/modules/' + code;
    return this.http.get<ModuleContent>(moduleContentUrl);
  }

  getCurricula(): Observable<Curriculum[]> {
    const curriculaUrl = 'http://172.17.0.1:8080/fmms/curricula';
    return this.http.get<Curriculum[]>(curriculaUrl);
  }

  getSemesters(id: number): Observable<Semester[]> {
    const semestersUrl = 'http://172.17.0.1:8080/fmms/curriculum/' + id + '/semesters';
    return this.http.get<CurriculumResponse>(semestersUrl)
      .map(data => data.semesters);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
