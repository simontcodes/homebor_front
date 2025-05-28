import { Injectable, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

import { TENANT_SLUG } from '../../app.token';
import { TenantConfig } from '../models/tenant-config.model';
import { ApiResponse } from '../types/api-response';
import { Tenant } from '../models/tenant.model';
import { CreateTenantDto } from '../dto/createTenant.dto';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private slug: string;
  private configSubject = new BehaviorSubject<TenantConfig>({
    slug: 'homebor',
    name: 'Homebor Platform',
    logoUrl: 'assets/logo.png',
    faviconUrl: 'assets/favicon.ico',
    heroText: '',
    heroImageUrl: '',
    themeColor: '#F1F1F1',
    welcomeMessage: 'Welcome to Homebor — Find the perfect homestay in Canada!',
    websiteTitle: 'Homebor Platform',
    contactEmail: 'hello@homebor.ca',
    showNewsletterSignup: true,
  });
  /** Expose as observable so any component can subscribe */
  config$ = this.configSubject.asObservable();

  private baseUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(TENANT_SLUG) injectedSlug?: string
  ) {
    this.slug = injectedSlug || this.resolveSlug();
  }

  private resolveSlug(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.hostname.split('.')[0];
    }
    return 'homebor';
  }

  getTenantSlug() {
    return this.slug;
  }

  createTenant(
    dto: CreateTenantDto
  ): Observable<ApiResponse<{ tenant: Tenant; user: any }>> {
    // assuming your backend endpoint is POST /tenants
    return this.http.post<ApiResponse<{ tenant: Tenant; user: any }>>(
      `${this.baseUrl}tenants`,
      dto
    );
  }

  // tenant.service.ts
  loadConfig(slug: string = this.slug): Observable<TenantConfig> {
    return this.http
      .get<ApiResponse<any>>(
        `${this.baseUrl}tenant-config/by-slug/${encodeURIComponent(slug)}`
      )
      .pipe(
        map((resp) => {
          const raw = resp.data;
          // construct a full TenantConfig
          return {
            slug,
            name: raw.websiteTitle || 'Unnamed Tenant',
            logoUrl: raw.logoUrl,
            faviconUrl: raw.faviconUrl,
            heroText: raw.heroText,
            heroImageUrl: raw.heroImageUrl,
            themeColor: raw.themeColor,
            welcomeMessage: raw.welcomeMessage,
            websiteTitle: raw.websiteTitle,
            contactEmail: raw.contactEmail,
            showNewsletterSignup: raw.showNewsletterSignup,
          } as TenantConfig;
        }),
        tap((cfg) => this.configSubject.next(cfg)),
        catchError((err) => {
          console.error('Failed to load tenant config', err);
          const fallback: TenantConfig = {
            slug,
            name: 'Default Tenant',
            logoUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
            faviconUrl: '',
            heroText: '',
            heroImageUrl: '',
            themeColor: '#FFFFFF',
            welcomeMessage: '',
            websiteTitle: '',
            contactEmail: '',
            showNewsletterSignup: false,
          };
          this.configSubject.next(fallback);
          return of(fallback);
        })
      );
  }
}
