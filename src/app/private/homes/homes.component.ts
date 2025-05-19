import { Component, Input, OnInit } from '@angular/core';
import { TableDropdownComponent } from '../../components/table-dropdown/table-dropdown.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homes',
  imports: [
    TableDropdownComponent,
    CommonModule,
  ],
  templateUrl: './homes.component.html',
})
export class HomesComponent implements OnInit {
  TableName = 'Homes';
  @Input() color: 'light' | 'dark' = 'light';
  constructor(private router: Router) {}

  ngOnInit() {}

   onAddHome() {
    // adjust this path to match your routing setup
    this.router.navigate(['/homes/new']);
  }
}
