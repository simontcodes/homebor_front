import { Component, OnInit } from "@angular/core";

import { UserDropdownComponent } from "../user-dropdown/user-dropdown.component";


@Component({
  selector: "app-admin-navbar",
  imports: [UserDropdownComponent],
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
