import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig,MatDialogRef} from "@angular/material";
import { CreateProjectModalComponent } from '../create-project-modal/create-project-modal.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  onCreate() {

    const dialogConfig = new MatDialogConfig();

     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width ="60%";
    // dialogConfig.data = {
    //   id: 1,
    //   title: 'Project Details',
    // };
    // dialogConfig.position = {
    //   'top': '0',
    //   'right': '50%'
    // };
    this.dialog.open(CreateProjectModalComponent,dialogConfig);
  }

  ngOnInit() {
  }

  onClose(){

  }
}
