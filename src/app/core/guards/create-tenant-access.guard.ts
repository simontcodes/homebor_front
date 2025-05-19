import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { UserRole } from '../enums/user-roles.enum';

export const CreateTenantAccessGuard: CanActivateFn = () => {
  const router = inject(Router);

  try {
    const token = localStorage.getItem('access_token');
    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;

    if (!token || !user) {
      router.navigate(['/login']);
      return false;
    }

    const isAdmin = user.role.name === UserRole.ADMIN;
    const hasNoTenant = user.tenant === null || user.tenant === undefined;

    if (isAdmin && hasNoTenant) {
      return true;
    }
    //need to create a 403 page
    router.navigate(['/']);
    return false;
  } catch (e) {
    router.navigate(['/login']);
    return false;
  }
};
