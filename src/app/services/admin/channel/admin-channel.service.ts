import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Channel } from '../../../interfaces/general/channel';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminChannelService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.storageService.getToken()}`,
    });
  }

  public getChannels(page: number, size: number): Observable<Channel[]> {
    return this.http.get<Channel[]>(
      `${environment.baseUrl}/admin/channel/get?page=${page}&size=${size}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public getChannelById(id: string): Observable<Channel> {
    return this.http.get<Channel>(
      `${environment.baseUrl}/admin/channel/get/${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public saveChannel(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(
      `${environment.baseUrl}/admin/channel/save`,
      channel,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public updateChannel(id: string, channel: Channel): Observable<Channel> {
    return this.http.put<Channel>(
      `${environment.baseUrl}/admin/channel/update/${id}`,
      channel,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public deleteChannel(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.baseUrl}/admin/channel/delete/${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
