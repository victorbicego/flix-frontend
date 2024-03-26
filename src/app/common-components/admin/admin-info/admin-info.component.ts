import { Component, Input, OnInit } from '@angular/core';
import { AdminUserService } from '../../../services/admin/user/admin-user.service';
import { User } from '../../../interfaces/admin/user';
import { StorageService } from '../../../services/admin/storage/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-info.component.html',
  styleUrl: './admin-info.component.scss',
})
export class AdminInfoComponent implements OnInit {
  @Input() environment: string | null = null;
  user: User | null = null;

  constructor(
    private adminUserService: AdminUserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo(): void {
    if (this.environment === 'core') {
      this.adminUserService.getUserInfoCore().subscribe({
        next: (response: User) => {
          this.user = response;
        },
        error: (error) => {
          if (error.status == 403) {
            this.storageService.clearCoreData();
            this.router.navigate(['/admin/login']);
            console.error('Error fetching user from the backend', error);
          }
          console.error('Error fetching user from the backend', error);
        },
      });
    } else if (this.environment === 'feed') {
      this.adminUserService.getUserInfoFeed().subscribe({
        next: (response: User) => {
          this.user = response;
        },
        error: (error) => {
          if (error.status == 403) {
            this.storageService.clearFeedData();
            this.router.navigate(['/admin/login']);
            console.error('Error fetching user from the backend', error);
          }
          console.error('Error fetching user from the backend', error);
        },
      });
    }
  }

  public logout(): void {
    if (this.environment) {
      if (this.environment === 'core') {
        this.storageService.clearFeedData();
      } else if (this.environment === 'feed') {
        this.storageService.clearFeedData();
      }
      this.router.navigate(['/admin/login']);
    }
  }
}
