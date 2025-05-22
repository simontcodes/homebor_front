// app.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { TenantService } from './core/services/tenant.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private tenantService: TenantService,
    private titleService: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    const slug = this.tenantService.getTenantSlug();
    this.tenantService.loadConfig(slug).subscribe(cfg => {
      console.log('[App] Loaded tenant config:', cfg);

      // set <title>
      this.titleService.setTitle(`${slug} | ${cfg.websiteTitle}`);

      // meta tags
      this.meta.updateTag({ name: 'description', content: `${cfg.name} — ${cfg.welcomeMessage}` });
      this.meta.updateTag({ property: 'og:title', content: cfg.name });
      this.meta.updateTag({ property: 'og:description', content: cfg.welcomeMessage });
      this.meta.updateTag({ property: 'og:image', content: cfg.logoUrl });

      // favicon
      if (isPlatformBrowser(this.platformId)) {
        this.setFavicon(cfg.faviconUrl);
      }
    });
  }

  private setFavicon(iconUrl: string) {
    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = iconUrl;
    document.head.appendChild(link);
  }
}
