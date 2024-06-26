import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthGuardService implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(): boolean {
    const token = this.storageService.getToken();
    const role = this.storageService.getRole();
    if (token != null && role != null && role === 'ADMIN') {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
  }
}
