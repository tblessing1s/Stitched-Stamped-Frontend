import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWrapperService {

  constructor(private http: HttpClient) { }

  post<T>(body: T, url: string): Observable<T> {
    return this.http.post<T>(environment.backend.url + url, body);
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(environment.backend.url + url);
  }
}
