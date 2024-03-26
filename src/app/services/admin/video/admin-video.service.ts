import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { VideoChannel } from '../../../interfaces/general/video-channel';
import { Video } from '../../../interfaces/general/video';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminVideoService {
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

  public getVideosCore(page: number, size: number): Observable<Video[]> {
    return this.http.get<Video[]>(
      `${environment.coreBaseUrl}/admin/video/get?page=${page}&size=${size}`,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public getVideosFeed(page: number, size: number): Observable<Video[]> {
    return this.http.get<Video[]>(
      `${environment.feedBaseUrl}/admin/video/get?page=${page}&size=${size}`,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }

  public getVideoByIdCore(id: string): Observable<Video> {
    return this.http.get<Video>(
      `${environment.coreBaseUrl}/admin/video/get/${id}`,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public getVideoByIdFeed(id: string): Observable<Video> {
    return this.http.get<Video>(
      `${environment.feedBaseUrl}/admin/video/get/${id}`,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }

  public saveVideoCore(video: Video): Observable<Video> {
    return this.http.post<Video>(
      `${environment.coreBaseUrl}/admin/video/save`,
      video,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public saveVideoFeed(video: VideoChannel): Observable<Video> {
    return this.http.post<Video>(
      `${environment.feedBaseUrl}/admin/video/save`,
      video,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }

  public updateVideoCore(id: string, video: Video): Observable<Video> {
    return this.http.put<Video>(
      `${environment.coreBaseUrl}/admin/video/update/${id}`,
      video,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public updateVideoFeed(id: string, video: Video): Observable<Video> {
    return this.http.put<Video>(
      `${environment.feedBaseUrl}/admin/video/update/${id}`,
      video,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }

  public deleteVideoCore(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.coreBaseUrl}/admin/video/delete/${id}`,
      {
        headers: this.getCoreHeaders(),
      }
    );
  }

  public deleteVideoFeed(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.feedBaseUrl}/admin/video/delete/${id}`,
      {
        headers: this.getFeedHeaders(),
      }
    );
  }
}
