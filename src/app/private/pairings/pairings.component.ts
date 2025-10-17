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
  templateUrl: './pairings.component.html',
})
export class PairingsComponent implements OnInit {
  TableName = 'Pairings';
  @Input() color: 'light' | 'dark' = 'light';
  constructor(private router: Router) {}

  ngOnInit() {}

  pairings = [
  {
    studentName: 'Alice Johnson',
    studentPhoto: 'assets/img/team-2-800x800.jpg',
    studentLocation: 'Tokyo, Japan',
    homestayName: 'Smith Family',
    checkIn: 'Sep 1, 2025',
    checkOut: 'Dec 15, 2025',
    status: 'Active',
  },
  {
    studentName: 'Bob Lee',
    studentPhoto: 'assets/img/team-1-800x800.jpg' ,
    studentLocation: 'Seoul, South Korea',
    homestayName: null,
    checkIn: null,
    checkOut: null,
    status: 'Unpaired',
  },
   {
    studentName: 'Carolina Menendez',
    studentPhoto: 'assets/img/team-4-470x470.png' ,
    studentLocation: 'Seoul, South Korea',
    homestayName: null,
    checkIn: null,
    checkOut: null,
    status: 'Unpaired',
  },
  // Add more sample or real data here
];

viewDetails(pairing: any): void {
  console.log('View pairing details:', pairing);
  // Navigate to details page or open a modal
}

unpair(pairing: any): void {
  console.log('Unpairing:', pairing);
  // Call your service to unpair, then refresh the list
}


   onAddPairing() {
    this.router.navigate(['/pairings/new']);
  }
}
