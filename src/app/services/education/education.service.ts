import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../../interfaces/education.interface';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  
  private url = 'data/educations.json';

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.url);
  }
}
