import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationResponse } from '../../../interfaces/admin/authentication-response';
import { Observable } from 'rxjs';
import { Authentication } from '../../../interfaces/admin/authentication';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public coreLogin(
    username: string,
    password: string
  ): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      environment.coreBaseUrl + '/auth/login',
      this.getBody(username, password)
    );
  }

  public feedLogin(
    username: string,
    password: string
  ): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      environment.feedBaseUrl + '/auth/login',
      this.getBody(username, password)
    );
  }

  private getBody(username: string, password: string): Authentication {
    return {
      username: username,
      password: password,
    };
  }
}
