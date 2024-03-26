import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../interfaces/admin/user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminUserService } from '../../../../services/admin/user/admin-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() userToEdit: User | null = null;
  @Input() environment: string | null = null;
  userForm: FormGroup | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private adminUserService: AdminUserService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.userToEdit) {
      this.userForm = this.formBuilder.group({
        id: [this.userToEdit.id],
        username: [this.userToEdit.username, [Validators.required]],
        role: [this.userToEdit.role, [Validators.required]],
        name: [this.userToEdit.name, [Validators.required]],
        surname: [this.userToEdit.surname, [Validators.required]],
        accountNonExpired: [
          this.userToEdit.accountNonExpired,
          [Validators.required],
        ],
        accountNonLocked: [
          this.userToEdit.accountNonLocked,
          [Validators.required],
        ],
        credentialNonExpired: [
          this.userToEdit.credentialNonExpired,
          [Validators.required],
        ],
        enabled: [this.userToEdit?.enabled, [Validators.required]],
      });
    }
  }

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public updateUser(): void {
    if (this.environment === 'core') {
      this.updateUserCore();
    }
    if (this.environment === 'feed') {
      this.updateUserFeed();
    }
  }

  private updateUserCore(): void {
    if (this.userForm && this.userForm.valid) {
      this.adminUserService
        .updateUserCore(this.userForm.value.id, this.userForm.value)
        .subscribe({
          next: (response: User) => {
            console.log('User saved successfully with ID:', response.id);
            this.closeModal();
          },
          error: (error) => {
            console.error('Error occurred while saving user:', error);
          },
        });
    } else {
      console.error('Form is invalid. Cannot save user.');
    }
  }

  private updateUserFeed(): void {
    if (this.userForm && this.userForm.valid) {
      this.adminUserService
        .updateUserFeed(this.userForm.value.id, this.userForm.value)
        .subscribe({
          next: (response: User) => {
            console.log('User saved successfully with ID:', response.id);
            this.closeModal();
          },
          error: (error) => {
            console.error('Error occurred while saving user:', error);
          },
        });
    } else {
      console.error('Form is invalid. Cannot save user.');
    }
  }
}
