import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { MatBottomSheet, MatDialogConfig, MatDialog } from '@angular/material';
import { BottomSheetComponent } from 'src/app/component/bottom-sheet/bottom-sheet.component';
import { fader, slider, stepper, transformer } from 'src/app/router-animations/router-animations.module';
import { RouterOutlet } from '@angular/router';
import { CreateProjectModalComponent } from 'src/app/component/create-project-modal/create-project-modal.component';
import { NotificationsComponent } from 'src/app/component/modals/notifications/notifications.component';
import { ActivityService } from 'src/app/services/activity.service';
import { store } from 'src/app/store';


@Component({
  selector: 'app-defaultlayout',
  templateUrl: './defaultlayout.component.html',
  styleUrls: ['./defaultlayout.component.css'],
  animations: [
    // fader,
    // slider,
    // stepper,
    // transformer
  ]
})
export class DefaultlayoutComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver,
    private service: DefaultlayoutService,
    private dialog: MatDialog,
    private activityService: ActivityService,
    private bottomSheet: MatBottomSheet) { }
  name: '';
  alias: '';
  selected: any;
  pathname: string;
  pathOrigin: string;
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

  step = '';
  opened = false;

  menuList = [
    { name: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
    {
      name: 'Project', icon: 'folder', link: '/project'
    },
    {
      name: 'Activities', icon: 'business_center', link: '/activity/documents',
    },
    {
      name: 'Documents', icon: 'list_alt', link: '/documents'
    },
    {
      name: 'Clients', icon: 'people_outlined', link: '/client'
    },
    {
      name: 'User Managment', icon: 'people', link: '/user/management'
      //  children: [
      //   { name: 'Groups', icon: 'people', link: '/user/group' },
      //   { name: 'Requests', icon: 'person_add', link: '/user/request' },
      //   { name: 'Users', icon: 'people', link: '/user' },
      // ]
    },
  
    {
      name: 'Settings', icon: 'settings', children: [
        { name: 'Server', icon: 'network_check', link: '/settings/server' },
        { name: 'ProjectTypes', icon: 'folder_open', link: '/settings/project/types' },
        { name: 'Status', icon: 'outlined_flag', link: '/settings/status/types' },
        { name: 'DocumentTypes', icon: 'file_copy', link: '/settings/document/types' },
        { name: 'TaskTypes', icon: 'sort', link: '/settings/task/types' },
      ]
    },
  ];

  onCreate() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '55%';
    this.dialog.open(CreateProjectModalComponent, dialogConfig);
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  /**
   *  @title 'set-step'
   * Utility function to control
   *  side bar toggle
   * and actuate navigation when
   *  items is clicked
   * @param object and index
   * @returns navigation function
   * */

  setStep(item, index) {
    if (item.children) {
      return (this.step === index) ?
        this.step = '' :
        this.step = index;
    } else {
      this.pathname = item.link;
      this.pathOrigin = item.link;
      this.selected = index;
      this.service.navigateToPath(item.link);

    }
  }

  async fetchOwnnotifications(id) {
    this.param.assigntoid = id;
    await this.activityService.getAssigneeActivities(this.param)
      .subscribe(({ message, data }) => {
        if (message === 'Success') {
           this.activityList = data.map((item: any) => ({ ...item }));
           console.log(this.activityList);
        } else {
          this.activityList = [];
        }
      }, err => {
        console.log(err);
        return this.activityList = [];
      });
  }
  getProfile({ fullname, username }) {
    console.log(fullname);
    this.name = fullname;
    this.alias = username;
  }

  ngOnInit() {
    const authUser = localStorage.getItem('currentUser');
    if (!authUser) { return this.service.navigateToPath('/login'); }
    this.getProfile(this.service.user);
    const profile = JSON.parse(localStorage.getItem('profile'));
    this.fetchOwnnotifications(profile.id);
    this.pathname = this.pathOrigin = window.location.pathname;
  }

  handleLogOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('profile');
    store.dispatch({type:'LOGOUT'});
    return this.service.navigateToPath('/login');
  }
  openBottomSheet() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    this.bottomSheet.open(BottomSheetComponent).afterDismissed().subscribe(
      ()=>{
        this.fetchOwnnotifications(profile.id);
      }
    );
  }



}
