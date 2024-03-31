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

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.storageService.getToken()}`,
    });
  }

  public getVideos(page: number, size: number): Observable<Video[]> {
    return this.http.get<Video[]>(
      `${environment.baseUrl}/admin/video/get?page=${page}&size=${size}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public getVideoById(id: string): Observable<Video> {
    return this.http.get<Video>(
      `${environment.baseUrl}/admin/video/get/${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public saveVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(
      `${environment.baseUrl}/admin/video/save`,
      video,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public updateVideo(id: string, video: Video): Observable<Video> {
    return this.http.put<Video>(
      `${environment.baseUrl}/admin/video/update/${id}`,
      video,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public deleteVideo(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.baseUrl}/admin/video/delete/${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
