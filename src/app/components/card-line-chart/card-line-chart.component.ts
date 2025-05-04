import { Component, OnInit, AfterViewInit } from '@angular/core';
const Chart = require('chart.js'); // ✅ for Chart.js v2.9.4

@Component({
  selector: 'app-card-line-chart',
  templateUrl: './card-line-chart.component.html',
})
export class CardLineChartComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const ctx = (document.getElementById('line-chart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: new Date().getFullYear().toString(),
            backgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: (new Date().getFullYear() - 1).toString(),
            backgroundColor: '#fff',
            borderColor: '#fff',
            data: [40, 68, 86, 74, 56, 60, 87],
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: 'white',
          },
          position: 'bottom',
          align: 'end',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              gridLines: {
                display: false,
                color: 'rgba(33, 37, 41, 0.3)',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              gridLines: {
                color: 'rgba(255, 255, 255, 0.15)',
              },
            },
          ],
        },
      },
    });
  }
}
