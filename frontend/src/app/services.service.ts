import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/api';

  signUp(data: User) {
    return this.http.post(`${this.apiUrl}/signup`, data, {
      withCredentials: true,
    });
  }

  login(data: User) {
    return this.http.post(`${this.apiUrl}/login`, data, {
      withCredentials: true,
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, {
      withCredentials: true,
    });
  }
}
