import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { TENANT_SLUG } from './app.token';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    {
      provide: TENANT_SLUG,
      useFactory: () => globalThis.ngServerContext?.tenantSlug || 'homebor',
    },
  ],
};
