import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../interfaces/admin/user';
import { environment } from '../../../../environments/environment';
import { ChangePassword } from '../../../interfaces/admin/change-password';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.storageService.getToken()}`,
    });
  }

  public getUsers(page: number, size: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.baseUrl}/admin/user/get?page=${page}&size=${size}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/admin/user/get/${id}`, {
      headers: this.getHeaders(),
    });
  }

  public saveUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.baseUrl}/admin/user/save`,
      user,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(
      `${environment.baseUrl}/admin/user/update/${id}`,
      user,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public updateUserPassword(
    id: string,
    password: ChangePassword
  ): Observable<User> {
    return this.http.put<User>(
      `${environment.baseUrl}/admin/user/update-password/${id}`,
      password,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.baseUrl}/admin/user/delete/${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public getUserInfo(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/get`, {
      headers: this.getHeaders(),
    });
  }
}
