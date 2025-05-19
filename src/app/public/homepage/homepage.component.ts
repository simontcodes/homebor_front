import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TenantConfig } from '../../core/models/tenant-config.model';
import { TenantService } from '../../core/services/tenant.service';
import { IndexNavbarComponent } from '../../components/index-navbar/index-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    IndexNavbarComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  config!: TenantConfig;
  currentYear = new Date().getFullYear();

  constructor(private tenantService: TenantService) {}

  ngOnInit(): void {
    this.tenantService.config$
      .subscribe(cfg => {
        console.log('[Homepage] Tenant config:', cfg);
        this.config = cfg;
      });
  }
}
