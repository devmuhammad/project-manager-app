import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { MatBottomSheet } from '@angular/material';
import { BottomSheetComponent } from 'src/app/component/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-defaultlayout',
  templateUrl: './defaultlayout.component.html',
  styleUrls: ['./defaultlayout.component.css']
})
export class DefaultlayoutComponent {
  constructor(private breakpointObserver: BreakpointObserver,
    private service:DefaultlayoutService,
    private bottomSheet: MatBottomSheet) { }

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
