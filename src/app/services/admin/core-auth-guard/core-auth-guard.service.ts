import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthGuardService implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(): boolean {
    const coreToken = this.storageService.getCoreToken();
    const coreRole = this.storageService.getCoreRole();
    if (coreToken != null && coreRole != null && coreRole === 'ADMIN') {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
  }
}
