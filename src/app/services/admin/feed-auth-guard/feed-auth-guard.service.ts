import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FeedAuthGuardService implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  public canActivate(): boolean {
    const coreToken = this.storageService.getFeedToken();
    const coreRole = this.storageService.getFeedRole();
    if (coreToken != null && coreRole != null && coreRole === 'ADMIN') {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
  }
}
