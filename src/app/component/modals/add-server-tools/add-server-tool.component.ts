import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from '../../../services/project.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ServerService } from 'src/app/services/server.service';


@Component({
  selector: 'app-add-server-tool',
  templateUrl: './add-server-tool.component.html',
  styleUrls: ['./add-server-tool.component.css']
})
export class AddServerToolComponent implements OnInit {
  
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

  serverCredList = []
  
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjectService,  
    private serverService: ServerService,  
    private activityServices: ActivityService,
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddServerToolComponent>) 
    {
      this.form = this.fb.group({ 
        database: "",
        applicationserver: "",
        serverCredId: "",
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
  this.getCred()
}

getCred(){
  this.serverService.getServerCredentialsProject(this.data.projectid)
  .subscribe((account)=>{
    
    this.serverCredList = account.data
  })
}


getDate(dt){
  return new Date(dt).toDateString()
}


 setDetails(){
   if (this.data.database){
      this.update = true
      this.type = "Update"
   }
   this.form.get("database").setValue(this.data.records)
   this.form.get("applicationserver").setValue(this.data.applicationServer)
   this.form.get("status").setValue(this.data.status)
   this.form.get("serverCredId").setValue(parseInt(this.data.serverCredentialID))
 }

 updateServerTool(){
  const nwServerTool = {
    records: this.form.get("database").value,
    applicationServer: this.form.get('applicationserver').value,
    projectid: this.data.projectid,
    projectname: this.data.projectname,
    status: this.form.get("status").value,
    serverCredentialID: this.form.get("serverCredId").value
}
this.serverService.updateServerTool(nwServerTool)
.subscribe(res => {
  // console.log(res);
  if (res.message === 'Success') {

    this.form.get("database").setValue("")
    this.form.get("applicationserver").setValue("")
    this.form.get("status").setValue(this.data.status)
    this.loadingBar.complete();
    this.snackBar.open('Success ! Added', 'Dismiss', {
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

 addServerTool(){
   if (this.update){
    this.loadingBar.start();

      this.updateServerTool()
      return ;
   }
   
   const applicationServer = this.form.get('applicationserver').value
   const database = this.form.get("database").value
   if (applicationServer == "" || database == ""){
     return alert("Invalid Entries");
   }

  this.loadingBar.start();
  const nwServerTool = {
        records: database,
        projectid: this.data.projectid,
        projectname: this.data.projectname,
        applicationServer: applicationServer,
        serverCredentialID: this.form.get('serverCredId').value.toString(),
        status: "active" 
  }
  this.serverService.addServerTool(nwServerTool)
  .subscribe(res => {
    // console.log(res);
    if (res.message === 'Success') {

      this.form.get("database").setValue("")
      this.form.get("applicationserver").setValue("")
      this.form.get("status").setValue(this.data.status)
      this.loadingBar.complete();
      this.snackBar.open('Success ! Added', 'Dismiss', {
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
