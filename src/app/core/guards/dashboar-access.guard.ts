import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { UserRole } from '../enums/user-roles.enum';

export const DashboardAccessGuard: CanActivateFn = () => {
  const router = inject(Router);

  try {
    const token = localStorage.getItem('access_token');
    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;

    if (!token || !user) {
      router.navigate(['/login']);
      return false;
    }

    const isAdmin = user.role === UserRole.ADMIN || user.role === UserRole.COORDINATOR;
    const hasTenant = user.tenant !== null && user.tenant !== undefined;

    if (isAdmin && !hasTenant) {
      router.navigate(['/create-tenant']);
      return false;
    }

    return true;
  } catch (e) {
    router.navigate(['/login']);
    return false;
  }
};
