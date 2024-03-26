import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly CORE_TOKEN_KEY = 'core_token';
  private readonly FEED_TOKEN_KEY = 'feed_token';

  private readonly CORE_ROLE_KEY = 'core_role';
  private readonly FEED_ROLE_KEY = 'feed_role';

  constructor() {}

  public getCoreToken(): string | null {
    return localStorage.getItem(this.CORE_TOKEN_KEY) || null;
  }

  public getFeedToken(): string | null {
    return localStorage.getItem(this.FEED_TOKEN_KEY) || null;
  }

  public setCoreToken(value: string): void {
    localStorage.setItem(this.CORE_TOKEN_KEY, value);
  }

  public setFeedToken(value: string): void {
    localStorage.setItem(this.FEED_TOKEN_KEY, value);
  }

  public getCoreRole(): string | null {
    return localStorage.getItem(this.CORE_ROLE_KEY) || null;
  }

  public getFeedRole(): string | null {
    return localStorage.getItem(this.FEED_ROLE_KEY) || null;
  }

  public setCoreRole(value: string): void {
    localStorage.setItem(this.CORE_ROLE_KEY, value);
  }

  public setFeedRole(value: string): void {
    localStorage.setItem(this.FEED_ROLE_KEY, value);
  }

  public clearCoreData(): void {
    localStorage.removeItem(this.CORE_TOKEN_KEY);
    localStorage.removeItem(this.CORE_ROLE_KEY);
  }

  public clearFeedData(): void {
    localStorage.removeItem(this.FEED_TOKEN_KEY);
    localStorage.removeItem(this.FEED_ROLE_KEY);
  }
}
