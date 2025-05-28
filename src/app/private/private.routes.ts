import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from '../layouts/admin/admin.component';
import { AuthComponent } from '../layouts/auth/auth.component';
import { DashboardAccessGuard } from '../core/guards/dashboar-access.guard';
import { CreateTenantComponent } from './tenant/create-tenant.component';
import { CreateTenantAccessGuard } from '../core/guards/create-tenant-access.guard';
import { HomesComponent } from './homes/homes.component';
import { NewHomeComponent } from './homes/new-home/new-home.component';

export const privateRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [DashboardAccessGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'homes', component: HomesComponent },
      {path: 'homes/new', component: NewHomeComponent},
    ],
  },
  {
    path: '',
    component: AuthComponent,
    canActivate: [CreateTenantAccessGuard],
    children: [
      { path: 'create-tenant', component: CreateTenantComponent },
    ],
  }
];
