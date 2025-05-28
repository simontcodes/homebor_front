import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';
import { NotificationDropdownComponent } from '../notification-dropdown/notification-dropdown.component';
import { TenantService } from '../../core/services/tenant.service';
import { TenantConfig } from '../../core/models/tenant-config.model';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    UserDropdownComponent,
    NotificationDropdownComponent,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  config!: TenantConfig;
  collapseShow = 'hidden';
  companyName: string = '';
  constructor(private tenantService: TenantService) {
  }

    ngOnInit(): void {
    this.tenantService.config$
      .subscribe(cfg => {
        console.log('[Homepage] Tenant config:', cfg);
        this.config = cfg;
      });
  }
  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }
}
