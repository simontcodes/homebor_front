import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RouterModule, Router } from "@angular/router";

import { AuthService } from "../../../core/services/auth.service";
import { LogInDto } from "../../../core/dto/logIn.dto";

@Component({
  selector: "app-login",
  imports: [CommonModule, RouterModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],

      },
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    const formValue = this.loginForm.value;
    const loginDto: LogInDto = formValue;

    this.authService.login(loginDto).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Log in failed';
        console.error(err);
      }
    });
  }
}
