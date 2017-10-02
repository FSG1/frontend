import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const semesters = [
      {"semester": 1,
      "modules": [
        {"module_code": "JAV1",        "module_name": "Programming in Java 1",       "credits": 5 },
        {"module_code": "DBS",        "module_name": "Databases",       "credits": 5 },
        {"module_code": "BUA",        "module_name": "Business Administration",       "credits": 4 },
        {"module_code": "MAT1",        "module_name": "Mathematics 1",       "credits": 4 },
        {"module_code": "ENG1",        "module_name": "English 1",       "credits": 1 },
        {"module_code": "PRJ1",        "module_name": "Project 1",       "credits": 10 },
        {"module_code": "COM1",        "module_name": "Communication 1",       "credits": 2 }
        ]},
        {"semester": 2,
          "modules": [
            {"module_code": "JAV2",        "module_name": "Programming in Java 2",       "credits": 5 },
            {"module_code": "MOD1",        "module_name": "Modeling Techniques 1",       "credits": 1 },
            {"module_code": "SEN1",        "module_name": "Software Engineering 1",       "credits": 3 },
            {"module_code": "BUMA",        "module_name": "Business Management",       "credits": 3 },
            {"module_code": "ITSM",        "module_name": "IT Service management",       "credits": 5 },
            {"module_code": "PRJ2",        "module_name": "Project 2",       "credits": 10 },
            {"module_code": "COM2",        "module_name": "Communication 2",       "credits": 1 }
          ]}
    ];
    return {semesters};
  }
}
