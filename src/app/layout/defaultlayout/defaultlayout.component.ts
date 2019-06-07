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
    {
      name: "General",icon:'dashboard', children: [
        { name: "Dashboard", icon:'dashboard', link: "/dashboard" },
        { name: "Profile",icon:'person', link: "/profile" }
      ]
    },
    {
      name: "Project", icon:'folder', children: [
        { name: 'Activities',icon:'folder', link: "/project" },
        { name: 'Create',icon:'add', link: "/create" }
      ]
    },
    { name: "Settings", icon:'settings', link: "/settings" },
    { name: "Report", icon:'reports', link: "/report" },
  ]

}
