import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TenantConfig } from '../../core/models/tenant-config.model';
import { TenantService } from '../../core/services/tenant.service';
import { IndexNavbarComponent } from "../../components/index-navbar/index-navbar.component";
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, IndexNavbarComponent, FooterComponent, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  config: TenantConfig = {
    slug: 'homebor',
    name: 'Homebor Platform',
    logoUrl: 'assets/logo.png',
    themeColor: '#F1F1F1',
    welcomeMessage: 'Welcome to Homebor — Find the perfect homestay in Canada!',
    featuredHomes: ['Toronto Cozy Loft', 'Downtown Montreal Room'],
    contactEmail: 'hello@homebor.ca',
    showNewsletterSignup: true,
  }
  private platformId = inject(PLATFORM_ID);

  currentYear = new Date().getFullYear();
  constructor(
    private route: ActivatedRoute,
    private tenantService: TenantService,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    const slug = this.tenantService.getTenantSlug();
    console.log('[Homepage] Using tenant slug:', slug);

    this.tenantService.loadConfig(slug).subscribe((cfg) => {
      console.log('[Homepage] Loaded config:', cfg);
      this.config = cfg;

      // Set <title>
      this.titleService.setTitle(cfg.welcomeMessage);

      // Set meta description
      this.meta.updateTag({
        name: 'description',
        content: `${cfg.name} – ${cfg.welcomeMessage}`,
      });

      // Set Open Graph (optional)
      this.meta.updateTag({ property: 'og:title', content: cfg.name });
      this.meta.updateTag({
        property: 'og:description',
        content: cfg.welcomeMessage,
      });
      this.meta.updateTag({ property: 'og:image', content: cfg.logoUrl });

      // Dynamically set favicon (see below)
      if (isPlatformBrowser(this.platformId)) {
        this.setFavicon(cfg.logoUrl);
      }
    });
  }

  setFavicon(iconUrl: string) {
    const existingLink = document.querySelector(
      "link[rel*='icon']"
    ) as HTMLLinkElement;
    if (existingLink) {
      existingLink.href = iconUrl;
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = iconUrl;
      document.head.appendChild(link);
    }
  }
}
