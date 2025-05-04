import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { AdminNavbarComponent } from '../../components/admin-navbar/admin-navbar.component';
import { FooterAdminComponent } from '../../components/footer-admin/footer-admin.component';
import { HeaderStatsComponent } from '../../components/header-stats/header-stats.component';
import { TenantService } from '../../core/services/tenant.service';

@Component({
  selector: 'app-admin',
  imports: [
    SidebarComponent,
    AdminNavbarComponent,
    FooterAdminComponent,
    RouterModule,
    HeaderStatsComponent,
  ],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  constructor(private tenantService: TenantService) {}
  tenantConfig: any;

  ngOnInit(): void {
    this.tenantConfig = this.tenantService.getTenantSlug();
    console.log(this.tenantConfig, 'tenantConfig');
  }
}
