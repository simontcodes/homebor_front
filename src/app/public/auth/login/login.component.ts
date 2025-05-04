import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [CommonModule, RouterModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
