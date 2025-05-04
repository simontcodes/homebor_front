import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-auth-navbar",
  imports: [RouterModule, CommonModule],
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  navbarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
