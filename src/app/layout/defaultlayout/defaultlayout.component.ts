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

@Component({
  selector: 'app-defaultlayout',
  templateUrl: './defaultlayout.component.html',
  styleUrls: ['./defaultlayout.component.css'],
  animations: [
    fader,
    slider,
    stepper,
    transformer
  ]
})
export class DefaultlayoutComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver,
              private service: DefaultlayoutService,
              private dialog: MatDialog,
              private bottomSheet: MatBottomSheet) { }
  name: '';
  alias: '';
  // tslint:disable-next-line: member-ordering
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  step = '';
  opened = true;

  menuList = [
    { name: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
    {
      name: 'Project', icon: 'folder', children: [
        { name: 'Projects', icon: 'folder', link: '/project' },
        { name: 'Activities', icon: 'work', link: '/project/activities' },
      ]
    },
    { name: 'User Managment', icon: 'people', children: [
      { name: 'Groups', icon: 'people', link: '/user/group' },
      { name: 'Requests', icon: 'person_add', link: '/user/request' },
      { name: 'Users', icon: 'people', link: '/user' },
    ]},
    {
      name: 'Clients', icon: 'people_outlined', link: '/client'
    },
    {
      name: 'Settings', icon: 'settings', children: [
        { name: 'Server', icon: 'network_check', link: '/settings/server' },
        { name: 'ProjectTypes', icon: 'folder_open', link: '/settings/project/types' },
        { name: 'StatusTypes', icon: 'outlined_flag', link: '/settings/status/types' },
        { name: 'DocumentTypes', icon: 'file_copy', link: '/settings/document/types' },
        { name: 'taskTypes', icon: 'sort', link: '/settings/task/types' },
      ]
    },
  ];

  onCreate() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width ="55%";
    
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
   *  */
  setStep(item, index) {
    if (item.children) {
      if (this.step === index) {
        return this.step = '';
      }
      return this.step = index;
    }

  
    return this.service.navigateToPath(item.link);
  }

  getProfile({fullname,username}) {
    console.log(fullname);
    this.name = fullname;
    this.alias = username; 
  }

  ngOnInit() {
    const authUser = localStorage.getItem('currentUser');
    if (!authUser) { return this.service.navigateToPath('/'); }
    this.getProfile(this.service.user);
  }
  handleLogOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('profile');
    return this.service.navigateToPath('/login');
  }
  openBottomSheet() {
    this.bottomSheet.open(BottomSheetComponent);
  }

}
