import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { CreateTenantDto } from '../../core/dto/createTenant.dto';
import { TenantService } from '../../core/services/tenant.service';
import e from 'express';
import { ApiResponse } from '../../core/types/api-response';
import { Tenant } from '../../core/models/tenant.model';
import { User } from '../../core/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-tenant',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-tenant.component.html',
})
export class CreateTenantComponent {
  createTenantForm: FormGroup;
  errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tenantService: TenantService
  ) {
    this.createTenantForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      companyEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.createTenantForm.value, 'createTenantForm');
    if (this.createTenantForm.invalid) return;

    const formValue = this.createTenantForm.value;

    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;

    if (!user?.id) {
      this.errorMessage = 'User not found. Please log in again.';
      this.router.navigate(['/login']);
      return;
    }
    const createTenantDto: CreateTenantDto = {
      name: formValue.companyName,
      adminUserId: user.id,
      email: formValue.companyEmail,
    };

    console.log(createTenantDto, 'createTenantDto');

    this.tenantService.createTenant(createTenantDto).subscribe({
      next: (response: ApiResponse<{ tenant: Tenant; user: User }>) => {
        // now response.data.tenant  and response.data.user are typed
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        // err.status, err.error, etc. are now available without `any`
        this.errorMessage =
          err.error?.message ?? 'An unexpected error occurred';
        console.error(err);
      },
    });
  }
}
