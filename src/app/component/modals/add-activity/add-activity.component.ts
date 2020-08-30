import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from '../../../services/project.service';
import { ActivityService } from 'src/app/services/activity.service';


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  
  form: FormGroup;

  activityList = []
  currUser : any
  isAdmin : boolean = false
  loading = false
  
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjectService,  
    private activityServices: ActivityService,
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddActivityComponent>) 
    {
      this.form = this.fb.group({ comment:[''], startdate:[null]})
    }

 async ngOnInit() {
   
      const profile = JSON.parse(localStorage.getItem('profile'))
      this.currUser = profile
      
      const userType = localStorage.getItem('userType')
      
      if (userType === 'admin') { 
        this.isAdmin = true
        
  }
  

}


getDate(dt){
  return new Date(dt).toDateString()
}

async getActivities  () {
  this.loadingBar.start()
  const param ={
    page: 0,
    size:20,
    projectid: this.data.projectId
  }

  this.activityServices.getActivitiesList()
   .subscribe(res => {

     if (res.message === "true") {
       
       let List = res.data.map((item: any) => ({...item}));

       List = List.sort((a,b) => b.datecreated - a.datecreated)
       
          List.forEach(el => {
            if(el.projectid == this.data.projectId){

              this.activityList.push(el)
              this.loadingBar.complete()

            }
          })
  // console.log(this.activityList)
        
     }
   }, err => {
     console.log(err)
     this.activityList = [];
    this.loadingBar.complete()

     this.snackBar.open('Network Failed', 'Dismiss', {
       panelClass: ['error'],
       duration: 7000,
       verticalPosition: 'bottom',
       horizontalPosition: 'right'
     });
   });

  
 }

 addActivities(){
   const comment = this.form.get('comment').value
   const startdate = this.form.get('startdate').value
   if (comment == '' || startdate == null){
     return ;
   }
  this.loadingBar.start();
  const nwActivity = {
    "actionfield": "Manual",
    "actioncategory": "Manual",
    "actionflow": "COMMENT",
    "actiontype": "comment",
    "activitystatus": "Manual Update",
    "assignedto": this.data.projecmanger.id,
    "datecreated": startdate,
    "parentid": 1,
    "projectid": this.data.projectId,
    "status": true,
    "usercomment": comment,
    "userid": this.currUser.id
  }
  this.activityServices.AddActivities(nwActivity)
  .subscribe(res => {
    // console.log(res);
    if (res.message === 'Success') {

      this.form.get('comment').setValue('')
      this.form.get('startdate').setValue(null)
      this.loadingBar.complete();
      this.snackBar.open('Success ! Activity Added', 'Dismiss', {
        panelClass: ['success'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      // this.getActivities()
    }
  },err => {
    this.loadingBar.complete();
    this.snackBar.open('Failed to add chat' , 'Dismiss', {
      panelClass: ['error'],
      duration: 7000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  })
 }
  


close() {
  this.dialogRef.close();
}
}
