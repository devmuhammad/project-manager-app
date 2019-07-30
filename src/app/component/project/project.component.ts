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
  showSide: boolean;
  panelOpenState = false;
  expand: false;
  panel: number;
  expandables = [
    { title: 'Activities', description: 'working on activities'},
    {title: 'Documents', description: 'Project Documents'},
    { title: 'Gmail', description: 'working on activities'},
    {title: 'Skype', description: 'Project Skype messages'},
    {title: 'Slack', description: 'Project slack messages'},
    {title: 'Git', description: 'Project repo and branches'},
    {title: 'Bug', description: 'Project issues'},
  ]



  
  toggleExpand(id) {
    
    return this.panel = id;
  }
  onCreate() {

    const dialogConfig = new MatDialogConfig();

     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width ="55%";
    
    this.dialog.open(CreateProjectModalComponent, dialogConfig);
  }
  ngOnInit() {
    this.showSide =false;
  }

  onClose(){

  }

  getExpandData($event) {
    console.log($event);
  this.showSide = $event;
  }
}
