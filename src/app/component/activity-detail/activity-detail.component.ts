import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDatepickerInputEvent,MatDialogConfig, MatDialog, } from '@angular/material';
import { ActivityService } from 'src/app/services/activity.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormControl } from '@angular/forms';
import {AddActivityComponent} from 'src/app/component/modals/add-activity/add-activity.component'

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {
   startDate = null
  comment: any;
  activityList = []
  actvList = []
  date = new FormControl(new Date());
  dateFilter = new FormControl()
  currProj = null
  isAdmin = false
  currUser : any;

  public param = {
    size: 20,
    page: 0,
  };

  constructor(
    private snackBar: MatSnackBar,
    private activityServices: ActivityService,
    private loadingBar: LoadingBarService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    const userType = localStorage.getItem('userType')
    const profile = JSON.parse(localStorage.getItem('profile'))
    this.currUser = profile

    if (userType === 'admin') { 
      this.isAdmin = true
    }

     this.getActivities()
     
  }

  addActivities(){
    if (this.currProj ==  null){
      return alert("Please select a project to add activity")
    }
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.currProj
    dialogConfig.width = '30%';
    this.dialog.open(AddActivityComponent, dialogConfig).afterClosed().subscribe(() => {
      // this.updateRecord();
      this.getActivities()
    }
    );

  }

  getDate(dt){
    return new Date(dt).toDateString()
  }

  filterDt(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    if (type === 'start'){
      this.startDate = new Date(event.value).getDate()
      return;
    }
    if(type === 'end' && this.startDate == null){
      return ;
    }

   const compDate = new Date(event.value).getDate()

   this.filterActivityByDate(this.startDate, compDate)
  }

  refreshActivities(){
    this.activityList = this.actvList
    this.currProj = null
  }

  async getActivities  () {

    this.activityServices.getActivitiesList()
     .subscribe(res => {

       if (res.message === "true") {
         
         let List = res.data.map((item: any) => ({...item}));

         List = List.sort((a,b) => b.datecreated - a.datecreated)
         if(this.isAdmin){
         this.activityList  = List
         this.actvList = List
         }else {
            List.forEach(el => {
              if(el.userid == this.currUser.id){

                this.activityList.push(el)
                this.actvList.push(el)
              }
            })
         }
    // console.log(this.activityList)
          
       }
     }, err => {
       console.log(err)
       this.activityList = [];
       this.snackBar.open('Network Failed', 'Dismiss', {
         panelClass: ['error'],
         duration: 7000,
         verticalPosition: 'bottom',
         horizontalPosition: 'right'
       });
     });
 
    
   }

   async filterActivityByProj(proj){
    this.activityList = this.actvList
    this.loadingBar.start();
    this.currProj = proj

    this.activityList = this.activityList.filter((data) => {
      return data.projectid === proj.projectId
    })
     // console.log(this.projArray.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1))
    //  this.activityList = this.activityList.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1)
       
   this.loadingBar.complete();
  
 }

   async filterActivityByDate(startdate,enddate){
     if(this.currProj == null){
    this.activityList = this.actvList
     }
    this.loadingBar.start();
    
    this.activityList = this.activityList.filter((data) => {
      const dt = new Date(data.datecreated).getDate()
     
      return dt >=  startdate && dt <= enddate
    })
     // console.log(this.projArray.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1))
    //  this.activityList = this.activityList.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1)
       
   this.loadingBar.complete();
  
 }

}
