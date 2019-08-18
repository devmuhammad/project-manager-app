import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateClientComponent } from '../modals/create-client/create-client.component';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private commonservice: DefaultlayoutService,
    ) { }

  ngOnInit() {
this.commonservice.handleBreadChrome({parent:'Clients',child:'List'})
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    this.dialog.open(CreateClientComponent, dialogConfig);

  }
}
