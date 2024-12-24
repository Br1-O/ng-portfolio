import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  private iconsUrl = 'data/skills/icons.json';

  constructor(private http: HttpClient) {}

  getIcons(): Observable<any[]> {
    return this.http.get<any[]>(this.iconsUrl);
  }
}