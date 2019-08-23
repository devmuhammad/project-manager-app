import { Component, OnInit } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';

@Component({
  selector: 'app-activity-container',
  templateUrl: './activity-container.component.html',
  styleUrls: ['./activity-container.component.css']
})
export class ActivityContainerComponent implements OnInit {

  constructor(
    private commonservice: DefaultlayoutService
  ) { }

  ngOnInit() {
    this.commonservice.handleBreadChrome({parent:'Activity', child : 'Module'});
  }

}
