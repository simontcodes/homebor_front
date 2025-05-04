import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';
import { NotificationDropdownComponent } from '../notification-dropdown/notification-dropdown.component';
import { TenantService } from '../../core/services/tenant.service';

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
  collapseShow = 'hidden';
  companyName: string = '';
  constructor(private tenantService: TenantService) {}

  ngOnInit() {
    console.log(this.companyName, 'CompanyName');
    this.companyName = this.tenantService.getTenantSlug()
  }
  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }
}
