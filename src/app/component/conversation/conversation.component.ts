import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ActivityService } from 'src/app/services/activity.service';
import { UsersService } from 'src/app/services/users.service';
import { async } from '@angular/core/testing';
// import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  @ViewChild('scrollMe') elementView: ElementRef;
idx: -1;
public param = {
  size: 20,
  page: 1,
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
chartArea: any;
shouldScroll: any;
chartIsloading: boolean;
comment: '';
  BASEACTIVITYTYPE: 'COMMENT';
activityList = [];
List = [];
  public queryParam = {
    datefrom: '',
    dateto: '',
    enddate: '',
    institutionId: '',
    sFilter: '',
    page: 0,
    size: 20,
  };
  prjctID = 0;
  self: number;
  projects: any = [];
userList: any;
myDOM: Object;
posted: boolean;
delete: boolean;
dltIndex: number;
  constructor(private service: ProjectService,
              private loadingBar: LoadingBarService,
              private snackBar: MatSnackBar,
              private userService: UsersService,
              private activityServices: ActivityService,
              private commonservice: DefaultlayoutService,
              private dialog: MatDialog) {

              }

  ngOnInit() {
    const {id} = JSON.parse(localStorage.getItem('profile'));
    this.self = id;
    this.getProjects();
    this.getGenChat(this.param);
    this.idx = -1;

  }

  scrolltoBottom() {
    const l = this.elementView.nativeElement.offsetHeight;
    this.elementView.nativeElement.scrollTop = l;
  }

  ngAfterViewInit() {
    console.log('afterinit');
    setTimeout(() => {
    this.scrolltoBottom();
    }, 3000);
  }

async fetchProjectComments(id) {
  this.activityServices.getProjectActivity(id)
  .subscribe(res => {
    if (res.message === 'Success') {
      this.activityList = res.data.filter(item => item.actionflow == 'COMMENT');
      this.chartIsloading = false;
      this.posted = false;
   
    }
  }, err => {
    this.chartIsloading = false;
    this.posted = false;
    this.activityList = [];
    console.log(err);
  });
  if (this.activityList.length > 0) {  this.scrolltoBottom(); }
}

  showProjectChart(project, index) {
    console.log(project);
    this.activityList = [];
    this.chartIsloading = true;
    this.idx = index;
    this.prjctID = project.projectId;
    this.fetchProjectComments(this.prjctID);
  }

fetchDeleteChat(index, id: number) {
  this.delete = true;  this.dltIndex = index;
  this.activityServices.deleteActivity(id)
  .subscribe(res => {
    if (res.message === 'Success') {
      this.idx >= 1 ? this.fetchProjectComments(this.prjctID) : this.getGenChat(this.param) ;
      this.delete = false;
      this.snackBar.open(' Chat deleted!', 'Dismiss', {
        panelClass: ['success'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }
  }, err => {
    this.delete = false;
    this.snackBar.open(' Failed to delete chat', 'Dismiss', {
      panelClass: ['error'],
      duration: 7000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  });
  return this.scrolltoBottom();
}

  getAllUsers() {
    const profile = JSON.parse(localStorage.getItem('profile'));

    this.userService.userList(profile.id)
    .subscribe(res => {
      if (res.message === 'Success') {
        this.userList = res.data.map((item: any) => ({...item}));
        console.log(this.userList);
        this.posted = false;
      }
    });
  }

  adduserComment() {
    const l = document.getElementsByClassName('chatArea').length;
    document.getElementsByClassName('chatArea')[l - 1].scrollIntoView();
    this.posted = true;
    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log(this.comment);
    if (this.comment) {
      this.addChat.description = this.comment;
      this.addChat.userid = profile.id;
      this.addChat.projectid = this.idx >= 1 ? this.prjctID : 0;
      this.addChat.activityType = 'COMMENT';
      this.activityServices.getAddActivities(this.addChat)
      .subscribe(res => {
        console.log(res);
        if (res.message === 'Success') {
          this.idx >= 1 ? this.fetchProjectComments(this.prjctID) : this.getGenChat(this.param) ;
          this.comment = '';
          // const chartArea = document.getElementById('cArea');
          // return chartArea.scrollTop = chartArea.scrollHeight;
        }
      }, err => {
        this.posted = false;
        this.snackBar.open('Failed to add chat' , 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
    }
    return this.scrolltoBottom();
  }


 async getGenChat  (param) {
   this.activityServices.getActivitiesList(param)
    .subscribe(res => {
      if (res.message === 'Success' ) {
        this.List = res.data.map((item: any) => ({...item}));
        this.activityList  = this.List.filter(item => item.activityType == 'COMMENT' && item.projectid == null);
        console.log(this.List);
        this.getAllUsers();

      }
    }, err => {
      this.activityList = [];
      this.snackBar.open('Network Failed', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    });

  if (this.activityList.length > 0) this.scrolltoBottom(); 
  }
  showGeneral() {
    // this.activityList =[];
    this.idx = -1;
    this.getGenChat(this.param);
  }
  getProjects() {
    this.service.getProjectList(this.queryParam)
    .subscribe(response => {
      if (response.message === 'Success') {
        this.projects = response.data.map(item => {
          return { ...item };
        });

        console.log(this.projects);
      }
    }, err => {
      this.snackBar.open('Network Failed', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    });
  }

}
