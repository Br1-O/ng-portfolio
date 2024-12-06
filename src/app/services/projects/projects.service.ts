import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) {}

  getProjects(user:string): Observable<any> {
    let url = `https://api.github.com/users/${user}/repos?per_page=100&page=1`;

    return this.http.get<any>(url);
  }

}
