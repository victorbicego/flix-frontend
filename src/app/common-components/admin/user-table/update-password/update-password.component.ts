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
  selector: 'app-update-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss',
})
export class UpdatePasswordComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() userToEdit: User | null = null;
  userForm: FormGroup | null = null;
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminUserService: AdminUserService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group(
      {
        id: [this.userToEdit?.id, [Validators.required]],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator(
    group: FormGroup
  ): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const repeatPassword = group.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordsNotMatch: true };
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleRepeatPasswordVisibility(): void {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public updatePassword(): void {
    if (this.userForm && this.userForm.valid) {
      this.adminUserService
        .updateUserPassword(this.userForm.value.id, this.userForm.value)
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
