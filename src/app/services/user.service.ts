import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppurl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppurl = environment.endpoint;
    this.myApiUrl = 'api';
  }

  signIn(user: User): Observable<any> {
    return this.http.post<any>(
      `${this.myAppurl}${this.myApiUrl}/register`,
      user
    );
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(
      `${this.myAppurl}${this.myApiUrl}/login`,
      user
    );
  }
}
