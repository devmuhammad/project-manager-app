import { Component, OnInit } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { Chart } from 'chart.js';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivityService } from 'src/app/services/activity.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private commonservice: DefaultlayoutService,
                private loadingBar: LoadingBarService,
                private service: ProjectService,
                private activityService: ActivityService,
                private snackBar: MatSnackBar,) { }

  public param = {
    page: 0 as number,
    assigntoid: 0 as number,
    size: 20 as number,
  };
  public queryParam = {
    datefrom: '',
    dateto: '',
    enddate: '',
    institutionId:'',
    sFilter:'',
    page: 0,
    size: 20,
  };
  lineChart = [];
  Doughnut = [];
BarChart = [];
RadarChart = [];
totalproj = 0
totaltask = 0
ongoingtask = 0
uncompletedtask = 0

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
      labels: [ 'Excellent', 'Good', 'Fair'],
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
    label: 'CABSOL Project',
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

isAdmin = false
currUser: any
  ngOnInit() {
    const profile = JSON.parse(localStorage.getItem('profile'))
    this.currUser= profile
    const userType = localStorage.getItem('userType')
    if (userType === 'admin') { 
      this.isAdmin = true
      this.fetchAllTasks()
      // this.fetchOwntaskList(profile.id)
    }else  this.fetchOwntaskList(profile.id);

    
    this.getProjects();
    this.commonservice.handleBreadChrome({parent: 'Dashboard', child: ''});
    this.renderLineChart();
    this.renderInforInDonut();
    this.renderInfoInBarChart();
    this.radarInfoChart();
  }

  async fetchAllTasks(){
    this.loadingBar.start();

    await this.service.getTasksList(this.queryParam)
      .subscribe(async response => {
        if (response.message === 'Success') {
          const taskList = await response.data.map(item => {
            return { ...item };});
            this.totaltask = taskList.length
            this.loadingBar.complete();
            const stringStat = taskList.filter((item: any) => item.status === 'Ongoing')
            this.ongoingtask = stringStat.length
            
            const newStat = taskList.filter((item: any) => item.status === 'Created')
            this.uncompletedtask = newStat.length
        }
      },err => {
        console.log(err);
        // return this.taskList = [];
      })
  }

  async fetchOwntaskList(id) {
    this.loadingBar.start();
    this.param.assigntoid = id;
    await this.service.getAssigneeTasks(this.param)
      .subscribe(({ message, data }) => {
        if (message === 'Success') {
          this.loadingBar.complete();
          const taskList = data.map((item: any) => ({ ...item }));
          // const taskList = activityList.filter((item: any) => item.actionflow === 'TASK');
          this.totaltask = taskList.length
          // console.log(taskList)
          const stringStat = taskList.filter((item: any) => item.status === 'Ongoing')
          this.ongoingtask = stringStat.length
          
          const newStat = taskList.filter((item: any) => item.status === 'Created')
          this.uncompletedtask = newStat.length
        } 
      }, err => {
        console.log(err);
        this.snackBar.open('Network Failed', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
  }

  getProjects() {
    this.loadingBar.start();
   
    this.service.getProjectList(this.queryParam)
      .subscribe(async response => {
        if (response.message === 'Success') {
          this.loadingBar.complete();
          const datarray = response.data.map(item => {
            return { ...item };
          });
          if (this.isAdmin){
          this.totalproj = datarray.length
          }else{
            const myprojects = []

           await datarray.forEach(async el => {
             if (el.teamMemberCounts >= 1){
              await this.service.getProjectTeamMembers(el.projectId).subscribe(async ({data}) => {
               
                await data.forEach(async e => {
                 if(e.id === this.currUser.id){
                  await myprojects.push(el)
                  
                  this.totalproj = myprojects.length
                 }
                 
                })
                // await this.putDetails(myprojects)
              });
              
              
              
             }
           }) 

          //  this.projArray = myprojects
           
           this.loadingBar.complete();
        }
        }
      }, err => {
        console.log(err);
        this.loadingBar.complete();
        this.snackBar.open('Network Failed', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
  }

  
}
