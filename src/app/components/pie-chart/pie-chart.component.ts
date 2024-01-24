import {Component, Input, OnInit} from '@angular/core';

import {Chart,registerables} from "chart.js";
Chart.register(...registerables)
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit{
  @Input() m!: number;
  @Input() a!: number;

  ngOnInit(): void {
    this.getChart()

  }

  public getChart(){
    const d = {
      labels: [
        'Presence',
        'Absence'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [this.m,this.a],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 3
      }]
    };

    new Chart("myChart", {

      type: 'pie',
      data: d,

    })
  }

}
