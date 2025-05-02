import { inject, Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { TENANT_SLUG } from '../../app.token';
import { TenantConfig } from '../models/tenant-config.model';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private slug: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(TENANT_SLUG) private injectedSlug?: string
  ) {
    this.slug = this.resolveSlug();
  }

  private resolveSlug(): string {
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
      const browserSlug = window.location.hostname.split('.')[0];
      console.log('[TenantService] Slug from browser:', browserSlug);
      return browserSlug;
    }

    try {
      const tokenSlug = inject(TENANT_SLUG);
      console.log('[TenantService] Slug from token:', tokenSlug);
      return tokenSlug;
    } catch {
      console.warn('[TenantService] TENANT_SLUG not provided — using default');
      return 'default';
    }
  }

  getTenantSlug(): string {
    return this.slug;
  }

  loadConfig(slug: string): Observable<TenantConfig> {
    const configs: Record<string, TenantConfig> = {
      'maple-homes': {
        slug: 'maple-homes',
        name: 'Maple Homestay Inc.',
        logoUrl: 'https://via.placeholder.com/120x60.png?text=Maple+Logo',
        themeColor: '#E0F7FA',
        welcomeMessage: 'Welcome to Maple Homestays!',
        featuredHomes: ['Downtown Toronto Home', 'Mississauga Retreat'],
        contactEmail: 'contact@maplehomes.ca',
        showNewsletterSignup: true,
      },
      'cozy-stays': {
        slug: 'cozy-stays',
        name: 'Cozy Stays Canada',
        logoUrl: 'https://via.placeholder.com/120x60.png?text=Cozy+Logo',
        themeColor: '#FFF3E0',
        welcomeMessage: 'Feel at home with Cozy Stays.',
        featuredHomes: ['Vancouver Lake House', 'Ottawa Student Flat'],
      },
    };

    return of(configs[slug] || configs['maple-homes']);
  }
}
