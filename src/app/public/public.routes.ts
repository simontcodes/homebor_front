import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from '../layouts/auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';

export const publicRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];