import { Semester} from './models/semester.model';

export const SEMESTERS: Semester[] = [
  { 'semester': 1,
    'modules': [
      {"code": 'JAV1',        "name": 'Programming in Java 1',       'credits': 5 },
      {"code": 'DBS',         "name": 'Databases',       'credits': 5 },
      {"code": 'BUA',         "name": 'Business Administration',       'credits': 4 },
      {"code": 'MAT1',        "name": 'Mathematics 1',       'credits': 4 },
      {"code": 'ENG1',        "name": 'English 1',       'credits': 1 },
      {"code": 'PRJ1',        "name": 'Project 1',       'credits': 10 },
      {"code": 'COM1',        "name": 'Communication 1',       'credits': 2 }
    ]},
  {'semester': 2,
    'modules': [
      {"code": 'JAV2',        "name": 'Programming in Java 2',       'credits': 5 },
      {"code": 'MOD1',        "name": 'Modeling Techniques 1',       'credits': 1 },
      {"code": 'SEN1',        "name": 'Software Engineering 1',       'credits': 3 },
      {"code": 'BUMA',        "name": 'Business Management',       'credits': 3 },
      {"code": 'ITSM',        "name": 'IT Service management',       'credits': 5 },
      {"code": 'PRJ2',        "name": 'Project 2',       'credits': 10 },
      {"code": 'COM2',        "name": 'Communication 2',       'credits': 1 }
    ]}
];
