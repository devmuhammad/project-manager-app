import { Component, OnInit } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';

@Component({
  selector: 'app-breadcrumblayout',
  templateUrl: './breadcrumblayout.component.html',
  styleUrls: ['./breadcrumblayout.component.css']
})
export class BreadcrumblayoutComponent implements OnInit {
  public crumb: any;
  constructor(private commonservice: DefaultlayoutService) { }

 async ngOnInit() {
  await this.commonservice.geteBreadChrome()
    .subscribe(chrome => {
     this.crumb = chrome;
    });
  }

  gotoPath(path) {
    this.commonservice.navigateToPath(path);
  }
}
