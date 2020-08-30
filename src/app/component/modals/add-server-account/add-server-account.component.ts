import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from '../../../services/project.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ServerService } from 'src/app/services/server.service';


@Component({
  selector: 'app-add-server-account',
  templateUrl: './add-server-account.component.html',
  styleUrls: ['./add-server-account.component.css']
})
export class AddServerAccountComponent implements OnInit {
  
  form: FormGroup;

  activityList = []
  currUser : any
  isAdmin : boolean = false
  loading = false
  update = false
  type = "New"

  statusList = [
    {name: "Active", value:"Active"},
    {name: "Suspended", value:"Suspended"}
  ]
  
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjectService,  
    private serverService: ServerService,  
    private activityServices: ActivityService,
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddServerAccountComponent>) 
    {
      this.form = this.fb.group({ 
        monthlyCharges: 0,
        name: "",
        // projectid: null,
        // projectname: "",
        serverProvider: "",
        status: "" })
    }

 async ngOnInit() {
   
      const profile = JSON.parse(localStorage.getItem('profile'))
      this.currUser = profile
      
      const userType = localStorage.getItem('userType')
      
      if (userType === 'admin') { 
        this.isAdmin = true
        
  }

  this.setDetails()

}


getDate(dt){
  return new Date(dt).toDateString()
}

 setDetails(){
   
   if (this.data.name){
      this.update = true
      this.type = "Update"
   }
   this.form.get("monthlyCharges").setValue(this.data.monthlyCharges)
   this.form.get("name").setValue(this.data.name)
  //  this.form.get("projectid").setValue(this.data.projectid)
   this.form.get("status").setValue(this.data.status)
   this.form.get("serverProvider").setValue(this.data.serverProvider)
 }

 updateServerAccount(){
  const nwServerAcct = {
    monthlyCharges: this.form.get("monthlyCharges").value,
    name: this.form.get('name').value,
    projectid: this.data.projectid,
    projectname: this.data.projectname,
    serverProvider: this.form.get('serverProvider').value,
    status: this.form.get("status").value 
} 
this.serverService.updateServerAccount(nwServerAcct)
.subscribe(res => {
  // console.log(res);
  if (res.message === 'Success') {

    this.form.get('name').setValue('')
    this.form.get('serverProvider').setValue('')
    this.form.get('monthlyCharges').setValue(0)
    this.loadingBar.complete();
    this.snackBar.open('Success ! Updated', 'Dismiss', {
      panelClass: ['success'],
      duration: 7000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
    // this.getActivities()
  }
},err => {
  this.loadingBar.complete();
  this.snackBar.open('Failed to Update' , 'Dismiss', {
    panelClass: ['error'],
    duration: 7000,
    verticalPosition: 'bottom',
    horizontalPosition: 'right'
  });
})

 }

 addServerAccount(){

   if (this.update){
  this.loadingBar.start();

      this.updateServerAccount()
      return ;
   }
   const name = this.form.get('name').value
   const serverProvider = this.form.get('serverProvider').value
   if (name == '' || serverProvider == null){
     return ;
   }
  this.loadingBar.start();

  const nwServerAcct = {
        monthlyCharges: this.form.get("monthlyCharges").value,
        name: name,
        projectid: this.data.projectid,
        projectname: this.data.projectname,
        serverProvider: serverProvider,
        status: this.form.get("status").value 
  }
  this.serverService.addServerAccount(nwServerAcct)
  .subscribe(res => {
    // console.log(res);
    if (res.message === 'Success') {

      this.form.get('name').setValue('')
      this.form.get('serverProvider').setValue('')
      this.form.get('monthlyCharges').setValue(0)
      this.loadingBar.complete();
      this.snackBar.open('Success !Added', 'Dismiss', {
        panelClass: ['success'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      // this.getActivities()
    }
  },err => {
    this.loadingBar.complete();
    this.snackBar.open('Failed to add' , 'Dismiss', {
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
