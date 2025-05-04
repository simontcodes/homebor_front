import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from '../layouts/admin/admin.component';
// import { AuthGuard } from '../core/guards/auth.guard';

export const privateRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];
