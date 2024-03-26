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

  private getCoreHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.storageService.getCoreToken()}`,
    });
  }

  public getChannelsCore(page: number, size: number): Observable<Channel[]> {
    return this.http.get<Channel[]>(
      `${environment.coreBaseUrl}/admin/channel/get?page=${page}&size=${size}`,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public getChannelByIdCore(id: string): Observable<Channel> {
    return this.http.get<Channel>(
      `${environment.coreBaseUrl}/admin/channel/get/${id}`,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public saveChannelCore(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(
      `${environment.coreBaseUrl}/admin/channel/save`,
      channel,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public updateChannelCore(id: string, channel: Channel): Observable<Channel> {
    return this.http.put<Channel>(
      `${environment.coreBaseUrl}/admin/channel/update/${id}`,
      channel,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public deleteChannelCore(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.coreBaseUrl}/admin/channel/delete/${id}`,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }
}
