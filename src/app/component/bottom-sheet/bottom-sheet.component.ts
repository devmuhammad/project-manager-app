import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AngularButtonLoaderService } from 'angular-button-loader';
export interface Project {
  value: string;
  viewValue: string;
}

export interface Task {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})

export class BottomSheetComponent implements OnInit {
  
  form: FormGroup;
  public queryParam = {
    datefrom: '',
    dateto: '',
    enddate: '',
    institutionId: '',
    sFilter: '',
    page: 0,
    size: 20,
  };
  userList: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private userService: UsersService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loadingBar: LoadingBarService,
    private btnLoader: AngularButtonLoaderService,
    private dialogRef: MatDialogRef<BottomSheetComponent>
  ) {
  this.form = this.fb.group({
  assignTo: ['', Validators.required],
  projectid: ['', Validators.required],
  description: ['', Validators.required],
  tasksTypeid: ['', Validators.required],
  comment: [''],
  priority: ['']
});
  }
  public taskFormInputs = {
    userid: '',
    assignedto: '',
    projectid: '',
    tasktypeid: '',
    description: '',
    usercomment: '',
    parentid: 1 as number,
    enddate: new Date(),
    startdate: null,
    status:'Initiated',
    priority: '',
    
  };
  projectList: Project[] = [];
  typeLabel: any;
  projectLabel: any;
  userLabel: any;
  tasksTypes: Task[] = [];
  disableAdmn = false


  getErrorNotified(message) {
    this.btnLoader.hideLoader();
    this.loadingBar.complete();
    return  this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error']
    });
  }

  priorityList = ['High','Medium','Low']

  getFormInputs(){
    const authUser = JSON.parse(localStorage.getItem('profile'));
    this.taskFormInputs.userid = authUser.id;
    this.taskFormInputs.tasktypeid = this.form.get('tasksTypeid').value;
    this.taskFormInputs.projectid = this.form.get('projectid').value;
    this.taskFormInputs.assignedto = this.form.get('assignTo').value;
    this.taskFormInputs.description = this.form.get('description').value;
    this.taskFormInputs.usercomment = this.form.get('comment').value;
    this.taskFormInputs.priority = this.form.get('priority').value;
    this.taskFormInputs.startdate = new Date()
  }
  getSuccessNotified(message) {
    this.btnLoader.hideLoader();
    this.form.reset();
    this.loadingBar.complete();
    return  this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['success']
    });
  }
  fetchProjectsList(payload) {
    this.projectLabel = 'Fetching Project...';
    this.projectService.getProjectList(payload)
      .subscribe(({ meta, data, message }) => {
        if (message === 'Success') {
          this.projectLabel = 'Projects';
          // console.log(data);
          this.projectList = data.map(item => {
            return { id: item.projectId, name: item.projectname };
          });
        }
      }, err => this.projectLabel = 'Could\'nt fetch Project');
  }

  fetchTaskTypeList() {
    this.typeLabel = 'Fetching Task Types...';
    this.projectService.getTaskType()
      .subscribe(({ meta, data, message }) => {
        if (message === 'Success') {
          this.typeLabel = 'Task Types';
          // console.log(data);
          this.tasksTypes = data.map(item => {
            return { ...item };
          });
        }
      }, err => this.typeLabel = 'Could\'nt fetch Types');
  }

  fetchUserList(payload) {
    this.userLabel = 'Fetching users...';
    this.userService.userList(payload)
      .subscribe(({ meta, data, message }) => {
        if (message === 'Success') {
          this.userLabel = 'Assign to';
          // console.log(data);
          this.userList = data.map(item => {
            return { ...item };
          });
        }
      }, err => this.userLabel = 'Could\'nt fetch users');
  }

  addTask() {
    event.preventDefault();
    this.btnLoader.displayLoader();
    this.loadingBar.start();
    this.getFormInputs();
    // console.log(this.taskFormInputs);
    return this.projectService.addNewTask(this.taskFormInputs)
    .subscribe(response => {
      // console.log(response);
      if(response && response.message === 'Success') {
       return this.getSuccessNotified('New task added Successfully');
       
      }else return this.getErrorNotified('Failed To add Task Check inputs');
    },err=>{
      console.log(err);
      return this.getErrorNotified('Network failed');
    })
  }

  ngOnInit() {
    const authUser = JSON.parse(localStorage.getItem('profile'));

    const userType = localStorage.getItem('userType')
    if (userType === 'admin') { 
      this.disableAdmn = false      
      this.taskFormInputs.status = 'Created'
      if (this.data != null){
        this.form.get('projectid').setValue(this.data)
      }
    }else {
      this.disableAdmn = true
      this.taskFormInputs.assignedto = authUser.id;
      this.form.get('assignTo').setValue(authUser.id);
      this.taskFormInputs.status = 'Initiated'

    }

    this.fetchTaskTypeList();
    this.fetchProjectsList(this.queryParam);
    this.fetchUserList(authUser.id);
  }

  closeModal() {
    this.dialogRef.close({action: 1});
  }

}
