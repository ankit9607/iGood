import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GraphService } from '../../../service/graph/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  strikesWithDuration : any;
  dayFrequency : any;

  constructor( private graphService : GraphService) { 
  }

  async ngOnInit() {
    this.strikesWithDuration = await this.graphService.getStrikesWithDuration();
    this.dayFrequency = await this.graphService.getDayFrequency();
    this.createChart();
    this.createDayFrequencyChart();
    }

  createChart(){
    var myChart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.strikesWithDuration.labels,
            datasets: [{
                label: 'Strikes (Minutes)',
                data: this.strikesWithDuration.data,
                backgroundColor : this.strikesWithDuration.backgroundColor,
                showdata : this.strikesWithDuration.showdata
            }]
        },
        options: {
          legend: { display: false }, 
          title: {
            display: true,
            text: 'All strikes'
          },
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                   return [
                     data.datasets[tooltipItem.datasetIndex].showdata[tooltipItem.index]
                    ];
                }
            }
          },
          scales: {
              yAxes: [{
                display : true,
                scaleLabel : {
                  display : true,
                  labelString : "Strike Duration"
                },
                ticks : {
                  display : false
                }
              }],
              xAxes: [{
                display : true,
                scaleLabel : {
                  display : true,
                  labelString : "Date"
                },
                ticks : {
                  display : false
                },
                barPercentage: 0.5,
                gridLines: {
                  display : true,
                  zeroLineColor: "red",
                  zeroLineWidth: 2
                }
              }]
          }
        }
    });
  }

  createDayFrequencyChart(){
    var myChart = new Chart('DayFrequencyCanvas', {
        type: 'line',
        data: {
          labels: this.dayFrequency.labels,
            datasets: [{
                label: 'Frequency in Day',
                data: this.dayFrequency.data,
                showdata : this.dayFrequency.showdata
            }]
        },
        options: {
          legend: { display: false }, 
          title: {
            display: true,
            text: 'Strikes Frequency'
          }
        }
    });
  }



}
