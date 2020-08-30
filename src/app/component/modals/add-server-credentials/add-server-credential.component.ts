import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from '../../../services/project.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ServerService } from 'src/app/services/server.service';


@Component({
  selector: 'app-add-server-credential',
  templateUrl: './add-server-credential.component.html',
  styleUrls: ['./add-server-credential.component.css']
})
export class AddServerCredentialComponent implements OnInit {
  
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

  serverAcctList = []
  
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjectService,  
    private serverService: ServerService,  
    private activityServices: ActivityService,
    private loadingBar: LoadingBarService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddServerCredentialComponent>) 
    {
      this.form = this.fb.group({ 
        name: "",
        serverpassword: "",
        serverip: "",
        serveros: "",
        servername: "",
        servertype: "",
        serverAcctId: "",
        })
    }

 async ngOnInit() {
   
      const profile = JSON.parse(localStorage.getItem('profile'))
      this.currUser = profile
      
      const userType = localStorage.getItem('userType')
      
      if (userType === 'admin') { 
        this.isAdmin = true
        
  }

  this.setDetails()
  this.getAcct()
}


getDate(dt){
  return new Date(dt).toDateString()
}

getAcct(){
  this.serverService.getServerAccountProject(this.data.projectid)
  .subscribe((account)=>{
    
    this.serverAcctList = account.data
  })
}


 setDetails(){
   if (this.data.username){
      this.update = true
      this.type = "Update"
   }
   this.form.get("servername").setValue(this.data.serverName)
   this.form.get("name").setValue(this.data.username)
   this.form.get("serverip").setValue(this.data.serverIPAddress)
   this.form.get("serveros").setValue(this.data.serverOs)
   this.form.get("servertype").setValue(this.data.serverType)
   this.form.get("serverpassword").setValue(this.data.serverPassword)
   this.form.get("serverAcctId").setValue(parseInt(this.data.accountid))
 }

 updateServerCredential(){
  const nwServerCred = {
    serverName: this.form.get("servername").value,
    username: this.form.get('name').value,
    projectid: this.data.projectid,
    projectname: this.data.projectname,
    serverIPAddress: this.form.get('serverip').value,
    serverType: this.form.get("servertype").value, 
    serverOs: this.form.get("serveros").value, 
    serverPassword: this.form.get("serverpassword").value,
    accountid: this.form.get("serverAcctId").value
}
this.serverService.updateServerCredential(nwServerCred)
.subscribe(res => {
  // console.log(res);
  if (res.message === 'Success') {

    this.form.get("servername").setValue("")
    this.form.get("name").setValue("")
    this.form.get("serverip").setValue("")
    this.form.get("serveros").setValue("")
    this.form.get("servertype").setValue("")
    this.form.get("serverpassword").setValue("")
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
  this.snackBar.open('Failed to update' , 'Dismiss', {
    panelClass: ['error'],
    duration: 7000,
    verticalPosition: 'bottom',
    horizontalPosition: 'right'
  });
})

 }

 addServerCredential(){
   if (this.update){
    this.loadingBar.start();

      this.updateServerCredential()
      return ;
   }
   const name = this.form.get('name').value
  //  const serverProvider = this.form.get('serverProvider').value
   if (name == '' ){
     return ;
   }

  this.loadingBar.start();
  const nwServerCred = {
    serverName: this.form.get("servername").value,
    username: name,
    projectid: this.data.projectid,
    projectname: this.data.projectname,
    serverIPAddress: this.form.get('serverip').value,
    serverType: this.form.get("servertype").value, 
    serverOs: this.form.get("serveros").value, 
    serverPassword: this.form.get("serverpassword").value, 
    accountid: this.form.get("serverAcctId").value
    
  }
  this.serverService.addServerCredential(nwServerCred)
  .subscribe(res => {
    // console.log(res);
    if (res.message === 'Success') {

      this.form.get("servername").setValue("")
      this.form.get("name").setValue("")
      this.form.get("serverip").setValue("")
      this.form.get("serveros").setValue("")
      this.form.get("servertype").setValue("")
      this.form.get("serverpassword").setValue("")
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
