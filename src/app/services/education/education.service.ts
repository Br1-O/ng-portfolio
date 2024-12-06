import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private url = 'data/educations.json';

  constructor(private http: HttpClient) {}

  getEducation(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
