import { Component, OnInit } from '@angular/core';
import { AuthNavbarComponent } from '../../components/auth-navbar/auth-navbar.component';
import { RouterModule } from '@angular/router';

import { FooterSmallComponent } from '../../components/footer-small/footer-small.component';
import { TenantService } from '../../core/services/tenant.service';

@Component({
  selector: 'app-auth',
  imports: [AuthNavbarComponent, RouterModule, FooterSmallComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
 

  ngOnInit(): void {
    
  }
}
