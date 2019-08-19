import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import {  DefaultlayoutService} from 'src/app/services/defaultlayout.service';

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
    private commonservice: DefaultlayoutService,
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

   ngOnInit() {
    this.showSide = false;
    this.commonservice.handleBreadChrome({parent: 'Project', child: 'Page'});
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
