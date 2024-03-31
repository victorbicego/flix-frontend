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
    this.adminUserService.getUserInfo().subscribe({
      next: (response: User) => {
        this.user = response;
      },
      error: (error) => {
        if (error.status == 403) {
          this.storageService.clearData();
          this.router.navigate(['/admin/login']);
          console.error('Error fetching user from the backend', error);
        }
        console.error('Error fetching user from the backend', error);
      },
    });
  }

  public logout(): void {
    this.storageService.clearData();
    this.router.navigate(['/admin/login']);
  }
}
