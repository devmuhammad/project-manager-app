import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import { CreateProjectModalComponent } from '../create-project-modal/create-project-modal.component';
import { store } from 'src/app/store';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public queryParam = {
    datecreatedfrom: '1567810800000',
    datecreatedto: '1567810800000',
    enddate: '1567810800000',
    page: 1,
    sfielter: '',
    size: 20,
    startdate: '1567810800000'
  };
  sideData: object;
  constructor(
    private dialog: MatDialog,
    private service: ProjectService,
     ) { }
  showSide: boolean;
  panelOpenState = false;
  expand: false;
  panel: number;
  panelType: any;
  expandableData: any[];
  expandables = [
    { title: 'Activities', description: 'No Activity', panelType: 'Activities'},
    {title: 'Documents', description: 'No Document attatched to Project', panelType: 'Documents'},
    {title: 'Team', description: 'Project Supervisors and Others', panelType: 'Team'},
    { title: 'Gmail', description: 'No mail recieved/sent', panelType: 'webHook'},
    {title: 'Skype', description: 'Project Skype messages', panelType: 'webHook'},
    {title: 'Slack', description: 'Project slack messages', panelType: 'webHook'},
    {title: 'Git', description: 'Project repo and branches', panelType: 'webHook'},
    {title: 'Bug', description: 'Project issues', panelType: 'webHook'},
  ];




  toggleExpand(id) {
    return this.panel = id;
  }
  // onCreate() {

  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '55%';
  //   this.dialog.open(CreateProjectModalComponent, dialogConfig).afterClosed().subscribe(
  //     () => {
  //       this.updateRecord();
  //     }
  //   ); 
  // }
  ngOnInit() {
    this.showSide = false;
  }

  onClose() {

  }

  getExpandData($event) {
    console.log($event);
    const {showDrawer, data, panelType} = $event;
    this.showSide = showDrawer;
    this.sideData = data;
    this.expandableData = this.expandables.filter((item: any) => item.panelType === panelType);
  }
}
