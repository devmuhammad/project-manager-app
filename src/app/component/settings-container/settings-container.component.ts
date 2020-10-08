import { Component, OnInit } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';

@Component({
  selector: 'app-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.css']
})
export class SettingsContainerComponent implements OnInit {

  constructor(
    private commonservice: DefaultlayoutService

  ) { }

  ngOnInit() {
    this.commonservice.handleBreadChrome({parent: 'Settings', child: ''});
  }

}
