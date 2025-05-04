import { Component, OnInit } from "@angular/core";
import { CardStatsComponent } from "../card-stats/card-stats.component";

@Component({
  selector: "app-header-stats",
  imports: [CardStatsComponent],
  templateUrl: "./header-stats.component.html",
})
export class HeaderStatsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
