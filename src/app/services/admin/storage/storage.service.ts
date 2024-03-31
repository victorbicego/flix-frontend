import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly TOKEN_KEY = 'token';
  private readonly ROLE_KEY = 'role';

  constructor() {}

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || null;
  }

  public setToken(value: string): void {
    localStorage.setItem(this.TOKEN_KEY, value);
  }

  public getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY) || null;
  }

  public setRole(value: string): void {
    localStorage.setItem(this.ROLE_KEY, value);
  }

  public clearData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }
}
