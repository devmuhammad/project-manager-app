import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivityService } from 'src/app/services/activity.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { ROLES } from 'src/app/helpers/constants';
import { getRoles } from 'src/app/helpers/roles.helpers';



@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {
  constructor(
    private StatusService: ProjectService,
    private activityService: ActivityService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private loadingBar: LoadingBarService,
  ) { }
  userRole: boolean;
  status: [];
  activityList: [];
  taskList: any[];
  showIndex: -1;
  comment: string;
  public param = {
    page: 0 as number,
    assigntoid: 0 as number,
    size: 20 as number,
  };
  public addChat = {
    activityType: ' ',
    assignedto: 0,
    description: '',
    parentid: 0,
    projectid: 0,
    projectstatus: 0,
    tasktypeid: 0,
    userid: 0
  };
  actionflow = 'TASK';
  posted: boolean;
  self: number;
  ngOnInit() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    this.self = profile.id;
    this.projectStatus();
    this.fetchOwntaskList(this.self);
    this.userRole = !getRoles(ROLES.ADMIN);
  }

  attatchFile(event) {
    const item = event.item[0];
  }

  async fetchOwntaskList(id) {
    this.loadingBar.start();
    this.param.assigntoid = id;
    await this.activityService.getAssigneeActivities(this.param)
      .subscribe(({ message, data }) => {
        if (message === 'Success') {
          this.loadingBar.complete();
          this.activityList = data.map((item: any) => ({ ...item }));
          console.log(this.activityList);
          this.taskList = this.activityList.filter((item: any) => item.actionflow === this.actionflow);

        } else {
          this.activityList = [];
        }
      }, err => {
        console.log(err);
        return this.activityList = [];
      });
  }

  showCommentInput(i) {
    if (this.showIndex === i) { return this.showIndex = -1; }
    this.showIndex = i;
  }

  adduserComment(task) {
    this.posted = true;
    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log(this.comment);
    if (this.comment) {
      this.addChat.description = this.comment;
      this.addChat.projectid = task.projectid.projectId;
      this.addChat.userid = profile.id;
      this.addChat.parentid = task.activityid;
      this.addChat.activityType = 'TASK';
      this.activityService.getAddActivities(this.addChat)
        .subscribe(res => {
          this.posted = false;
          if (res.message === 'Success') {
            console.log(res);
            this.fetchOwntaskList(profile.id);
            this.comment = '';
            this.snackBar.open('comment added', 'Dismiss', {
              panelClass: ['success'],
              duration: 7000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
            // const elem = document.getElementById('cArea');
            // elem.scrollIntoView = elem.scrollTo;
          }
        }, err => {
          this.posted = false;
          this.snackBar.open('Failed to add chat', 'Dismiss', {
            panelClass: ['error'],
            duration: 7000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        });
    }

  }

  addTasks() {
    const profile = JSON.parse(localStorage.getItem('profile'));

    this.bottomSheet.open(BottomSheetComponent).afterDismissed().subscribe(
      () => {
        this.fetchOwntaskList(profile.id);
      }
    );
  }
  updateStatus(status, task) {
    console.log(task);
  }
  projectStatus() {

    this.StatusService.getStatusList()
      .subscribe(response => {
        if (response.message === 'Success') {
          this.status = response.data.map((item: any) => ({ ...item }));
          console.log(this.status);
        }
      });
  }
}

