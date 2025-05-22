import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

import { IndexDropdownComponent } from '../index-dropdown/index-dropdown.component';
import { CommonModule } from '@angular/common';
import { TenantConfig } from '../../core/models/tenant-config.model';
import { TenantService } from '../../core/services/tenant.service';

@Component({
  selector: 'app-index-navbar',
  imports: [RouterModule, CommonModule, IndexDropdownComponent],
  templateUrl: './index-navbar.component.html',
})
export class IndexNavbarComponent {
  navbarOpen = false;
  config$: Observable<TenantConfig>;

  constructor(private tenantService: TenantService) {
    this.config$ = this.tenantService.config$;
  }

    onImgError(evt: Event) {
    console.error('Image failed to load:', (evt.target as HTMLImageElement).src);
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
