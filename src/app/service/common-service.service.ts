import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  studentData() {
    return [
      { "id": 1, "fname": "bansi", "lname": "vasoya", "mail": "bansi123@gmail.com", "clan": 35, "java": 35, "asp": 35  },
      { "id": 2, "fname": "diya", "lname": "patel", "mail": "diya@gmail.com", "clan": 35, "java": 35, "asp": 35 , },
      { "id": 3, "fname": "darsh", "lname": "devaliya", "mail": "darsh@gmail.com", "clan": 46, "java": 65, "asp": 45},
      { "id": 4, "fname": "jiya", "lname": "kant", "mail": "jiya@gmail.com", "clan": 71, "java": 82, "asp": 48 },
      { "id": 5, "fname": "abc", "lname": "patel", "mail": "abc@gmail.com", "clan": 78, "java": 87, "asp": 50 },
      { "id": 6, "fname": "hits", "lname": "meghani", "mail": "hits@gmail.com", "clan": 75, "java": 58, "asp": 74 },
      { "id": 7, "fname": "vir", "lname": "devaliya", "mail": "vir@gmail.com", "clan": 20, "java": 10, "asp": 12 },
      { "id": 8, "fname": "jinu", "lname": "kachhdiya", "mail": "jinu@gmail.com", "clan": 71, "java": 82, "asp": 48 },
      { "id": 9, "fname": "bhavik", "lname": "vasoya", "mail": "bhavik@gmail.com", "clan": 78, "java": 87, "asp": 50 }
    ]
  }

  constructor() { }
}
