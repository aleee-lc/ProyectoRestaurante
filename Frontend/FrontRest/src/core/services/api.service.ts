import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(endpoint: string) {
    return this.http.get(`${this.API}/${endpoint}`);
  }

  post(endpoint: string, body: any) {
    return this.http.post(`${this.API}/${endpoint}`, body);
  }
}
