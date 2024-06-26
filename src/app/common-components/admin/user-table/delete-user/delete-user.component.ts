import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../interfaces/admin/user';
import { AdminUserService } from '../../../../services/admin/user/admin-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
})
export class DeleteUserComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() userToDelete: User | null = null;

  constructor(private adminUserService: AdminUserService) {}

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public deleteUser(): void {
    if (this.userToDelete) {
      this.adminUserService.deleteUser(this.userToDelete.id!).subscribe({
        next: () => {
          console.log(
            'User delete successfully with ID:',
            this.userToDelete!.id
          );
          this.closeModal();
        },
        error: (error) => {
          console.error('Error occurred while deleting user:', error);
        },
      });
    }
  }
}
