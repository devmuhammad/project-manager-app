import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProjectService } from 'src/app/services/project.service';
import { ReasonService } from 'src/app/services/reason.service';

@Component({
  selector: 'app-extend-duedate',
  templateUrl: './extend-duedate.component.html',
  styleUrls: ['./extend-duedate.component.css']
})
export class ExtendDuedateComponent implements OnInit {

  form: FormGroup;
  userLabel = ""
  userList : any []
  project: {}
  
  managerList =[]
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjectService,  
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loadingBar: LoadingBarService,
    private dialogRef: MatDialogRef<ExtendDuedateComponent>
  ) { 
    this.form = this.fb.group({
      enddate: [new Date(this.data.enddate),{disabled: true}],
      
    })
  }

  async ngOnInit() {
    const authUser = await JSON.parse(localStorage.getItem('profile'));
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

  async updateProjAssign(){

    this.loadingBar.start();

    let proj = this.data
    proj.enddate = this.form.get('enddate').value
    
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
