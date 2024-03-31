import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel } from '../../../interfaces/general/channel';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient) {}

  public getSingleChannel(id: string): Observable<Channel> {
    return this.http.get<Channel>(environment.baseUrl + '/channel/' + id);
  }

  public getAllChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(environment.baseUrl + '/channel/all');
  }
}
