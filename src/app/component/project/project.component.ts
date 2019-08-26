import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import {  DefaultlayoutService} from 'src/app/services/defaultlayout.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
  public queryParam = {
    page: 0,
    size: 30,
    projectid: 0 as number,
  };

  sideData: any;
  constructor(
    private dialog: MatDialog,
    private service: ProjectService,
    private commonservice: DefaultlayoutService,
     ) { }
  showSide: boolean;
  panelOpenState = false;
  expand: false;
  panel: number;
  innerpane: number;
  teamprofiles: any[];
  projectActivities: any [];
  panelType: any;
  expandableData: any[];
  searchKey = '';
  expandables = [
    {title: 'Activities', description: 'No Activity', panelType: 'Activities'},
    {title: 'Documents', description: 'No Document attatched to Project', panelType: 'Documents'},
    {title: 'Team', description: 'Project Supervisors and Others', panelType: 'Team'},
    {title: 'Gmail', description: 'No mail recieved/sent', panelType: 'webHook'},
    {title: 'Skype', description: 'Project Skype messages', panelType: 'webHook'},
    {title: 'Slack', description: 'Project slack messages', panelType: 'webHook'},
    {title: 'Git', description: 'Project repo and branches', panelType: 'webHook'},
    {title: 'Bug', description: 'Project issues', panelType: 'webHook'},
  ];


async getTeamProfiles(id) {
  this.service.getProjectTeamMembers(id).subscribe(({data}) => {
    this.teamprofiles = data;
    console.log(this.teamprofiles);
  });
}


async getActivities(projectId) {
  this.queryParam.projectid = projectId;
  this.service.getProjectActivities(this.queryParam).subscribe(({data, message}) => {
    console.log(data);
    if (message === 'Success') { return  this.projectActivities = data;  }
    this.projectActivities = [];
  }, err => this.projectActivities = []);

}

toogleCollapse(id) {
  this.innerpane = id;
}

closeSidePanel() {
  this.showSide =false;
}

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
    this.sideData = data;
    this.showSide = showDrawer;
    this.expandableData = this.expandables.filter((item: any) => item.panelType === panelType);
    if (panelType === 'Team') { return this.getTeamProfiles(data.projectId); }
    if (panelType === 'Activities') { return this.getActivities(data.projectId); }

  }
}
