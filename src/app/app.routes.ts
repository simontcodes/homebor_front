import { Routes } from '@angular/router';

import { publicRoutes } from './public/public.routes';
import { privateRoutes } from './private/private.routes';

export const routes: Routes = [
  ...publicRoutes,
  ...privateRoutes,
  { path: '**', redirectTo: '' },
];
