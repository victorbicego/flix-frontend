import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { User } from '../../../interfaces/admin/user';
import { AdminUserService } from '../../../services/admin/user/admin-user.service';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    TablePaginationComponent,
    TableComponent,
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    UpdatePasswordComponent,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent implements OnInit {
  userList: User[] = [];
  currentPage = 0;
  pageSize = 10;
  isCreateModalOpen = false;
  isUpdateModalOpen = false;
  isDeleteModalOpen = false;
  isUpdatePasswordModalOpen = false;
  userToWork: User | null = null;

  constructor(
    private adminUserService: AdminUserService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.adminUserService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (response: User[]) => {
        this.userList = response;
      },
      error: (error) => {
        console.error('Error fetching users from the backend', error);
      },
    });
  }

  public nextPage(): void {
    this.currentPage++;
    this.getUsers();
  }

  public prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getUsers();
    }
  }

  public changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 0;
    this.getUsers();
  }

  public closeCreateModal(): void {
    this.getUsers();
    this.isCreateModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openCreateModal(): void {
    this.isCreateModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  public closeUpdateModal(): void {
    this.getUsers();
    this.isUpdateModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openUpdateModal(user: User): void {
    this.userToWork = user;
    this.isUpdateModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  public closeDeleteModal(): void {
    this.getUsers();
    this.isDeleteModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openDeleteModal(user: User): void {
    this.userToWork = user;
    this.isDeleteModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  public closeUpdatePasswordModal(): void {
    this.getUsers();
    this.isUpdatePasswordModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openUpdatePasswordModal(user: User): void {
    this.userToWork = user;
    this.isUpdatePasswordModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }
}
