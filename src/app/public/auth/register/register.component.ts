import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserDto } from '../../../core/dto/createUser.dto';

import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirm_email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordStrengthValidator]],
        date_of_birth: ['', Validators.required],
        role: ['admmin'], 
      },
      {
        validators: [this.emailMatchValidator],
      }
    );
  }

  ngOnInit(): void {}

  emailMatchValidator(group: AbstractControl): { [key: string]: any } | null {
    const email = group.get('email')?.value;
    const confirm = group.get('confirm_email')?.value;
    return email === confirm ? null : { emailMismatch: true };
  }

  passwordStrengthValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return !passwordValid ? { weakPassword: true } : null;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
  
    const formValue = this.registerForm.value;
  
    const userDto: CreateUserDto = {
      first_name: formValue.first_name,
      last_name: formValue.last_name,
      email: formValue.email,
      password: formValue.password,
      role: formValue.role,
      date_of_birth: new Date(formValue.date_of_birth).toISOString().split('T')[0], // YYYY-MM-DD
    };
  
    this.authService.register(userDto).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
        console.error(err);
      },
    });
  }
}
