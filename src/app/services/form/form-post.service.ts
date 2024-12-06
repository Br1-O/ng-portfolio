import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../../interfaces/message.interface';


@Injectable({
  providedIn: 'root'
})
export class FormPostService {

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  postRequest(url:string, message:Message): Observable<Message> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Message>(url, message, {headers});
  }
}