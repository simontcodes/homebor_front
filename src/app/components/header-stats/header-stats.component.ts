import { Component, OnInit } from "@angular/core";

import { CardStatsComponent } from "../card-stats/card-stats.component";
import { TenantService } from "../../core/services/tenant.service";
import { TenantConfig } from "../../core/models/tenant-config.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header-stats",
  imports: [CardStatsComponent, CommonModule],
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  config!: TenantConfig;

  constructor(private readonly tenantService: TenantService) {}

    ngOnInit(): void {
    this.tenantService.config$
      .subscribe(cfg => {
        this.config = cfg;
      });
  }
}
