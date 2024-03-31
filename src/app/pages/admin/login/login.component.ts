import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/admin/storage/storage.service';
import { AuthenticationResponse } from '../../../interfaces/admin/authentication-response';
import { AuthenticationService } from '../../../services/admin/authentication/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | null = null;
  showPassword: boolean = false;
  showErrorMessage: boolean = false;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public login(): void {
    if (this.loginForm && this.loginForm.valid) {
      this.authenticationService
        .adminLogin(
          this.loginForm.value.username,
          this.loginForm.value.password
        )
        .subscribe({
          next: (response: AuthenticationResponse) => {
            this.storageService.setToken(response.jwtToken);
            this.storageService.setRole(response.role.toString());
            this.router.navigate(['/admin/home'], {
              queryParams: { table: 'info' },
            });
          },
          error: (error) => {
            if (error.error.message === 'Bad credentials') {
              this.showErrorMessage = true;
              console.error(
                'Error logging in the core: Invalid credentials provided'
              );
            } else {
              console.error('Error logging in the core:', error);
            }
          },
        });
    }
  }

  public clearErrorMessage(): void {
    this.showErrorMessage = false;
  }
}
