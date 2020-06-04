import { Component, OnInit } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { ActivityService } from 'src/app/services/activity.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreateProjectModalComponent } from 'src/app/component/create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-breadcrumblayout',
  templateUrl: './breadcrumblayout.component.html',
  styleUrls: ['./breadcrumblayout.component.css']
})
export class BreadcrumblayoutComponent implements OnInit {
  public crumb: any;
  constructor(private commonservice: DefaultlayoutService,
    private activityService: ActivityService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver) { }

    name: '';
  alias: '';
  pathname: string;
  pathOrigin: string;
  isAdmin= false;
  public param = {
    page: 0 as number,
    assigntoid: 0 as number,
    size: 20 as number,
  }
   activityList = [];
  // tslint:disable-next-line: member-ordering
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

 async ngOnInit() {
  await this.commonservice.geteBreadChrome()
    .subscribe(chrome => {
     this.crumb = chrome;
    });

    // const authUser = localStorage.getItem('currentUser');
    // if (!authUser) { return this.service.navigateToPath('/login'); }
    const userType = localStorage.getItem('userType')
    if (userType === 'admin') this.isAdmin = true 
    else this.isAdmin = false
    this.getProfile(this.commonservice.user);
    const profile = JSON.parse(localStorage.getItem('profile'));
    this.fetchOwnnotifications(profile.id);
    this.pathname = this.pathOrigin = window.location.pathname;
  }

  onCreate() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '45%';
    this.dialog.open(CreateProjectModalComponent, dialogConfig);
  }

  async fetchOwnnotifications(id) {
    this.param.assigntoid = id;
    await this.activityService.getAssigneeActivities(this.param)
      .subscribe(({ message, data }) => {
        if (message === 'Success') {
           this.activityList = data.map((item: any) => ({ ...item }));
          //  console.log(this.activityList);
        } else {
          this.activityList = [];
        }
      }, err => {
        console.log(err);
        return this.activityList = [];
      });
  }
  getProfile({ fullname, username }) {
    // console.log(fullname);
    this.name = fullname;
    this.alias = username;
  }

  gotoPath(path) {
    this.commonservice.navigateToPath(path);
  }
}
