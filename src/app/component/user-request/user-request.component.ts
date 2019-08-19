import { Component, OnInit } from '@angular/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent implements OnInit {

  constructor(
    private commonservice: DefaultlayoutService,
  ) { }

  ngOnInit() {
    this.commonservice.handleBreadChrome({parent:'Users',child :'Request'});
  }

}
