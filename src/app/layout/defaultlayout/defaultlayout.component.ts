import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { MatBottomSheet } from '@angular/material';
import { BottomSheetComponent } from 'src/app/component/bottom-sheet/bottom-sheet.component';
import { fader, slider, stepper, transformer } from 'src/app/router-animations/router-animations.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-defaultlayout',
  templateUrl: './defaultlayout.component.html',
  styleUrls: ['./defaultlayout.component.css'],
  animations:[
    fader,
    slider,
    stepper,
    transformer
  ]
})
export class DefaultlayoutComponent implements OnInit{
  name:'';
  alias:'';
  constructor(private breakpointObserver: BreakpointObserver,
    private service:DefaultlayoutService,
    private bottomSheet: MatBottomSheet) { }
    prepareRoute(outlet: RouterOutlet) {
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  step = '';
  opened = true;
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

    return  this.service.navigateToPath(item.link)
  }

  getProfile(){
let profile = window.localStorage.getItem('profile');
// const {fullname,username} = profile;
if(profile){
  this.name = profile['fullname'],
  this.alias = profile['username'];
  console.log(this.alias)
}
  }

  ngOnInit() {
let authUser =window.localStorage.getItem('currentUser');
if(!authUser) return this.service.navigateToPath('/');
this.getProfile();
  }
  handleLogOut(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('profile');
   return this.service.navigateToPath('/login');
  }
  openBottomSheet(){
    this.bottomSheet.open(BottomSheetComponent)
  }

  menuList = [
    { name: "Dashboard", icon:'dashboard', link: "/dashboard" },
    {
      name: "Project", icon:'folder', children: [
        { name: 'Projects',icon:'folder', link: "/project" },
        { name: 'Activities',icon:'work', link: "/project/activities" },
      ]
    },
    { name: "Users", icon:'people', link: "/report" },
    { name: "Settings", icon:'settings', children:[
      { name: 'Server',icon:'network_check', link: "/settings/server" },
    ] },
  ]

}
