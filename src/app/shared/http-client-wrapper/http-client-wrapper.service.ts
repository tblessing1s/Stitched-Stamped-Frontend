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

  getHal<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  put<T>(body: T, url: string, id: number): Observable<T> {
    return this.http.put<T>(environment.backend.url + url + `/${id}`, body);
  }

  patch<T>(body: T, url: string, id: number): Observable<T> {
    return this.http.patch<T>(environment.backend.url + url + `/${id}`, body);
  }

  delete<T>(url: string, id: number) {
    return this.http.delete<T>(environment.backend.url + url + `/${id}`);
  }
}
