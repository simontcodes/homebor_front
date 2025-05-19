import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { LogInDto } from '../../../core/dto/logIn.dto';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    const formValue = this.loginForm.value;
    const loginDto: LogInDto = {
      email: formValue.email,
      password: formValue.password,
    };

    console.log('Login DTO:', loginDto);

    this.authService.login(loginDto).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      
        const { role, tenant } = response.data.user;
        const redirectTo =
          role.name === 'admin' && !tenant ? '/create-tenant' : '/dashboard';

        this.router.navigate([redirectTo]);
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.error(err);
      },
    });
  }
}
