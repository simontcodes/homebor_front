import { CommonModule } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";
import { TableDropdownComponent } from "../table-dropdown/table-dropdown.component";

@Component({
  selector: "app-card-table",
  imports: [CommonModule, TableDropdownComponent],
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  @Input()TableName!: string;
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor() {}

  ngOnInit(): void {}
}
