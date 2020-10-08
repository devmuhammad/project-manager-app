import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from './node_modules/src/app/services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from './node_modules/src/app/services/project.service';
import { ReasonService } from './node_modules/src/app/services/reason.service';

@Component({
  selector: 'app-reassign-project',
  templateUrl: './reassign-project.component.html',
  styleUrls: ['./reassign-project.component.css']
})
export class ReassignProjectComponent implements OnInit {

  form: FormGroup;
  userLabel = ""
  userList : any []
  project: {}
  Reasons= []
  // [
  //   {name: 'Official', value: "Official"},
  //   {name: 'Overworked', value: "Overworked"},
  //   {name: 'Underperfoming', value: "Underperforming"},
  //   {name: 'Moved to new project', value: "Moved to new project"},
  //   {name: 'Not suited to project', value: "Not suited to project"},
  //   {name: 'Other', value: "Other"},
    
  // ]
  managerList =[]
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjectService,  
    private reasonService: ReasonService,  
    private userService: UsersService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loadingBar: LoadingBarService,
    private dialogRef: MatDialogRef<ReassignProjectComponent>
  ) { 
    this.form = this.fb.group({
      projecmanger: [""],
      comments: [''],
      reason: [""]
    })
  }

  async ngOnInit() {

    const authUser = await JSON.parse(localStorage.getItem('profile'));

    if(this.data.projecmanger){
      this.form.get('projecmanger').setValue(this.data.projecmanger)
    }
    this.fetchManagers()
    this.fetchUserList(authUser.id);
    this.fetchReasons()
  }

  fetchReasons(){
    this.reasonService.getReasons().subscribe(async({data, message}) =>{
      if (message === 'true'){
       
        this.Reasons = data
       
      }
    })
  }


close() {
  this.dialogRef.close();
}

  getDate(date){
    if (date == null){
      return 'NIL'
    } 
    return new Date(date).toDateString()
  }

  fetchManagers(){
    this.service.getProjectManagers(this.data.projectId).subscribe(async({data, message}) =>{
      if (message === 'Success'){
        const List = await data.sort((a,b) => b.startdate - a.startdate)
        this.managerList = List
       
      }
    })
  }

  fetchUserList(payload) {
    this.userLabel = 'Fetching users...';
    this.userService.userList(payload)
      .subscribe(({ meta, data, message }) => {
        if (message === 'Success') {
          this.userLabel = 'Re-assign to';
          // console.log(data);
          this.userList = data.map(item => {
            return { ...item };
          });
        }
      }, err => this.userLabel = 'Could\'nt fetch users');
  }

  async updateProjAssign(){

    this.loadingBar.start();

    let proj = this.data
    proj.projecmangerid = this.form.get('projecmanger').value.id
    proj.projectmanagername = this.form.get('projecmanger').value.fullname
    proj.comments = this.form.get('comments').value
    proj.reasons = this.form.get('reason').value
    proj.proStartdate = new Date()
    proj.proEnddate = null
    // proj.projecttypeId = {projecttypeId: 1, code: "002", description: "cabsol project"}
    // this.data.projecttype.projecttypeId
    // console.log(proj)

    // return;

   await this.service.updateProject(proj).subscribe(async res =>{
    if (res.message === 'Success') {
      this.loadingBar.complete();
      
      this.snackBar.open('Update Successful', 'Dismiss', {
        panelClass: ['success'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
      this.close()
    }
   }, err => {
      this.loadingBar.complete();
    this.snackBar.open('Network Failed', 'Dismiss', {
     panelClass: ['error'],
     duration: 4000,
     verticalPosition: 'bottom',
     horizontalPosition: 'right'
   })
  })
  }
}
