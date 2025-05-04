import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
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
    if (isPlatformBrowser(this.platformId)) {
      return window.location.hostname.split('.')[0];
    }
    return this.injectedSlug || 'homebor';
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
      'homebor': {
        slug: 'homebor',
        name: 'Homebor Platform',
        logoUrl: 'assets/logo.png',
        themeColor: '#F1F1F1',
        welcomeMessage: 'Welcome to Homebor — Find the perfect homestay in Canada!',
        featuredHomes: ['Toronto Cozy Loft', 'Downtown Montreal Room'],
        contactEmail: 'hello@homebor.ca',
        showNewsletterSignup: true,
      },
    };

    return of(configs[slug] || configs['homebor']);
  }
}
