import { Component, OnInit } from '@angular/core';
import { CardLineChartComponent } from '../../components/card-line-chart/card-line-chart.component';
import { CardBarChartComponent } from '../../components/card-bar-chart/card-bar-chart.component';
import { CardPageVisitsComponent } from '../../components/card-page-visits/card-page-visits.component';
import { CardSocialTrafficComponent } from '../../components/card-social-traffic/card-social-traffic.component';
import { HeaderStatsComponent } from '../../components/header-stats/header-stats.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardLineChartComponent,
    CardBarChartComponent,
    CardPageVisitsComponent,
    CardSocialTrafficComponent,
    HeaderStatsComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
