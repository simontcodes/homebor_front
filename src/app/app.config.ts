import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { TENANT_SLUG } from './app.token';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    {
      provide: TENANT_SLUG,
      // ✅ Use a factory so `inject()` works
      useFactory: () => {
        try {
          return inject(TENANT_SLUG);
        } catch {
          return 'default';
        }
      },
    },
  ],
};