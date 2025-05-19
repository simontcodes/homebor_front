import { Component, Input, OnInit } from "@angular/core";
import { CardTableComponent } from "../card-table/card-table.component";

@Component({
  selector: "app-tables",
  imports: [CardTableComponent],
  templateUrl: "./tables.component.html",
})
export class TablesComponent implements OnInit {
  @Input() TableName!: string;
  constructor() {}

  ngOnInit(): void {}
}
