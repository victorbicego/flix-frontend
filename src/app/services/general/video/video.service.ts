import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoChannel } from '../../../interfaces/general/video-channel';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  public getVideoList(
    channelId: string | null,
    category: string | null,
    word: string | null,
    itemPerPage: number,
    pageNumber: number
  ): Observable<VideoChannel[]> {
    let url =
      environment.baseUrl +
      '/video' +
      '?page=' +
      pageNumber +
      '&size=' +
      itemPerPage;

    if (channelId) {
      url += '&channel=' + channelId;
    }
    if (category) {
      url += '&category=' + category;
    }
    if (word) {
      url += '&word=' + word;
    }

    return this.http.get<VideoChannel[]>(url);
  }

  public getSingleVideo(id: string): Observable<VideoChannel> {
    return this.http.get<VideoChannel>(environment.baseUrl + '/video/' + id);
  }

  public getRelatedVideos(id: string): Observable<VideoChannel[]> {
    return this.http.get<VideoChannel[]>(
      environment.baseUrl + '/video/related/' + id
    );
  }
}
