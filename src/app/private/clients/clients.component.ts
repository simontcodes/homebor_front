import { Component, Input, OnInit } from '@angular/core';
import { TableDropdownComponent } from '../../components/table-dropdown/table-dropdown.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  imports: [
    TableDropdownComponent,
    CommonModule,
  ],
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
  TableName = 'Clients';
  @Input() color: 'light' | 'dark' = 'light';
  constructor(private router: Router) {}

  ngOnInit() {}

   onAddHome() {
    this.router.navigate(['/homes/new']);
  }
}
