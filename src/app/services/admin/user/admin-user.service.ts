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

  private getCoreHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.storageService.getCoreToken()}`,
    });
  }

  private getFeedHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.storageService.getFeedToken()}`,
    });
  }

  public getUsersCore(page: number, size: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.coreBaseUrl}/admin/user/get?page=${page}&size=${size}`,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public getUsersFeed(page: number, size: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.feedBaseUrl}/admin/user/get?page=${page}&size=${size}`,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }

  public getUserByIdCore(id: string): Observable<User> {
    return this.http.get<User>(
      `${environment.coreBaseUrl}/admin/user/get/${id}`,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public getUserByIdFeed(id: string): Observable<User> {
    return this.http.get<User>(
      `${environment.feedBaseUrl}/admin/user/get/${id}`,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }

  public saveUserCore(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.coreBaseUrl}/admin/user/save`,
      user,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public saveUserFeed(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.feedBaseUrl}/admin/user/save`,
      user,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }

  public updateUserCore(id: string, user: User): Observable<User> {
    return this.http.put<User>(
      `${environment.coreBaseUrl}/admin/user/update/${id}`,
      user,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public updateUserFeed(id: string, user: User): Observable<User> {
    return this.http.put<User>(
      `${environment.feedBaseUrl}/admin/user/update/${id}`,
      user,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }

  public updateUserPasswordCore(
    id: string,
    password: ChangePassword
  ): Observable<User> {
    return this.http.put<User>(
      `${environment.coreBaseUrl}/admin/user/update-password/${id}`,
      password,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public updateUserPasswordFeed(
    id: string,
    password: ChangePassword
  ): Observable<User> {
    return this.http.put<User>(
      `${environment.feedBaseUrl}/admin/user/update-password/${id}`,
      password,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }

  public deleteUserCore(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.coreBaseUrl}/admin/user/delete/${id}`,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public deleteUserFeed(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.feedBaseUrl}/admin/user/delete/${id}`,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }

  public getUserInfoCore(): Observable<User> {
    return this.http.get<User>(`${environment.coreBaseUrl}/user/get`, {
      headers: this.getCoreHeaders(),
    });
  }

  public getUserInfoFeed(): Observable<User> {
    return this.http.get<User>(`${environment.feedBaseUrl}/user/get`, {
      headers: this.getFeedHeaders(),
    });
  }
}
