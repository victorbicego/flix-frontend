import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { VideoSync } from '../../../interfaces/admin/video-sync';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminVideoSyncService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.storageService.getToken()}`,
    });
  }

  public getVideosSync(page: number, size: number): Observable<VideoSync[]> {
    return this.http.get<VideoSync[]>(
      `${environment.baseUrl}/admin/sync/get?page=${page}&size=${size}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public syncVideos(): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/admin/sync/add`, {
      headers: this.getHeaders(),
    });
  }

  public deleteVideoSync(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.baseUrl}/admin/sync/delete/${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public updateVideoSync(id: string, video: VideoSync): Observable<VideoSync> {
    return this.http.put<VideoSync>(
      `${environment.baseUrl}/admin/sync/update/${id}`,
      video,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
