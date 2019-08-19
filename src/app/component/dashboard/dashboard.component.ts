import { Component, OnInit } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private commonservice: DefaultlayoutService) { }
  lineChart = [];
  Doughnut = [];
BarChart = [];
RadarChart = [];

renderLineChart() {
  
  this.lineChart = new Chart('lineChart', {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },

    options: {
      title: {
        text: 'Project and  Task Creation in 2019',
        display: true
    },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

renderInforInDonut(){
  this.Doughnut = new Chart('doughnut', {
    type: 'doughnut',
    data: {
      labels: [ 'Rejected', 'Accepted', 'Undecided'],
      datasets: [{
          label: '# of Staff',
          data: [ 5, 20, 10],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
      }]
     },

  options: {
    title: {
        text: 'Client Approvals',
        display: true
    },
  },
     scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
});
}

radarInfoChart(){
  this.RadarChart = new Chart('radarChart', {
    type: 'radar',
  data: {
   labels: [ 'Requirement', 'Analysis','Design', 'Coding','Testing','Implementation'],
   datasets: [{
       label: 'James Project',
       data: [1, 3, 4,5,4,6],
       backgroundColor:'rgba(255,99,132,.2)',
       borderColor:'rgba(255,99,132,1)',
          
       
       borderWidth: 1
   },{
    label: 'CAPSOLE Project',
    data: [4, 5, 2,7,2,3],
    backgroundColor:  'rgba(54, 162, 235, .2)',
    borderColor:  'rgba(54, 162, 235, 1)',
  
    borderWidth: 1
}
  ]
  }, 
  options: {
   title: {
       text: 'Current Projects Process Comparison',
       display: true
   },
   scales: {
      display: false,
   }
  }
  });
  
}
renderInfoInBarChart(){
  this.BarChart = new Chart('barChart', {
    type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
   datasets: [{
       label: '# of Votes',
       data: [9, 7 , 3, 5, 2, 10],
       backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(75, 192, 192, 0.2)',
           'rgba(153, 102, 255, 0.2)',
           'rgba(255, 159, 64, 0.2)'
       ],
       borderColor: [
           'rgba(255,99,132,1)',
           'rgba(54, 162, 235, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)',
           'rgba(255, 159, 64, 1)'
       ],
       borderWidth: 1
   }]
  }, 
  options: {
   title: {
       text: 'Projects Monthly Growth',
       display: true
   },
   scales: {
       yAxes: [{
           ticks: {
               beginAtZero: true
           }
       }]
   }
  }
  });
  
}
  ngOnInit() {
    this.commonservice.handleBreadChrome({parent: 'Dashboard', child: ''});
    this.renderLineChart();
    this.renderInforInDonut();
    this.renderInfoInBarChart();
    this.radarInfoChart();
  }

  
}
