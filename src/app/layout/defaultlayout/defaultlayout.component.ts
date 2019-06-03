import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';

@Component({
  selector: 'app-defaultlayout',
  templateUrl: './defaultlayout.component.html',
  styleUrls: ['./defaultlayout.component.css']
})
export class DefaultlayoutComponent {
  constructor(private breakpointObserver: BreakpointObserver,private service:DefaultlayoutService) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  step = '';
  opened = true;
  setStep(item, index) {
    if (item.children) {
      if (this.step === index) {
        return this.step = '';
      }
      return this.step = index;
    }

    return  this.service.navigateToPath(item.link)
  }

  menuList = [
    {
      name: "General", children: [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Profile", link: "/profile" }
      ]
    },
    {
      name: "Project", children: [
        { name: 'Activities', link: "/project" },
        { name: 'Create', link: "/create" }
      ]
    },
    { name: "Settings", link: "/settings" },
    { name: "Report", link: "/report" },
  ]

}
