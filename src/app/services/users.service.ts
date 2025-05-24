import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API_URL = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  get headers() {
    return {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    }
  }

  getUsers( page: number, limit: number ): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users?page=${page}&per_page=${ limit }`, this.headers);
  }

  getUserDetails( userId: string ): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users/${ userId }`, this.headers);
  }

}
