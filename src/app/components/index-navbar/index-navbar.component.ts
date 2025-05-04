import { Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IndexDropdownComponent } from "../index-dropdown/index-dropdown.component";
import { CommonModule } from "@angular/common";
import { TenantConfig } from "../../core/models/tenant-config.model";

@Component({
  selector: "app-index-navbar",
  imports: [RouterModule,CommonModule, IndexDropdownComponent],
  templateUrl: "./index-navbar.component.html",
})
export class IndexNavbarComponent implements OnInit {
  navbarOpen = false;
  @Input() TenantCongif!: TenantConfig

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
