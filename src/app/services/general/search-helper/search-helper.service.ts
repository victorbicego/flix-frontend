import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchHelperService {
  private search: string = '';
  private category: string = 'ALL';
  private channel: string = '';

  constructor() {}

  public getSearch(): string {
    return this.search;
  }

  public setSearch(value: string) {
    this.search = value;
  }

  public getCategory(): string {
    return this.category;
  }

  public setCategory(value: string) {
    this.category = value;
  }

  public getChannel(): string {
    return this.channel;
  }

  public setChannel(value: string) {
    this.channel = value;
  }
}
