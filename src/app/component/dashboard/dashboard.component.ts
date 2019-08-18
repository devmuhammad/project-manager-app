import { Component, OnInit } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private commonservice: DefaultlayoutService) { }

  ngOnInit() {
    this.commonservice.handleBreadChrome({parent: 'Dashboard', child: ''});
  }

}
