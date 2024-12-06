import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from '../../interfaces/repository.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  getProjects(user:string): Observable<Repository[]> {
    let url : string = `https://api.github.com/users/${user}/repos?per_page=100&page=1`;

    return this.http.get<Repository[]>(url);
  }

}
