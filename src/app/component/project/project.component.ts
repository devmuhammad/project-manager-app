import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import {  DefaultlayoutService} from 'src/app/services/defaultlayout.service';
import { isNgTemplate } from '@angular/compiler';
import { DocumentUpdateComponent } from '../document-update/document-update.component';
import { DocumentsService } from 'src/app/services/documents.service';
import { AngularButtonLoaderService } from 'angular-button-loader';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
  public queryParam = {
    page: 0,
    size: 20,
    projectid: 0 as number,
  };

  sideData: any;
  constructor(
    private dialog: MatDialog,
    private service: ProjectService,
    private btnLoader: AngularButtonLoaderService,
    private documentservice: DocumentsService,
    private snackBar: MatSnackBar,
    private commonservice: DefaultlayoutService,
     ) { }

  showSide: boolean;
  panelOpenState = false;
  expand: false;
  panel: number;
  innerpane: number;
  teamprofiles: any[];
  projectDocx: any;
  loadingBar: any;
  projectActivities: any [];
  panelType: any;
  expandableData: any[];
  currentId: any;
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
resizeName = (initialName) => {
    const length = 20;
    const append = '..';
    let newName = initialName;
    if (typeof newName === 'string') {
      if (newName.length > length) {
        return newName = initialName.substring(0, length - append.length) + append;
      } else {
        return newName;
      }

    } else {
      if (Object.keys(newName).length > length) {
        return newName = initialName.substring(0, length - append.length) + append;
      } else {
        return newName;
      }
    }

  }

  getErrorNotification(message) {
    this.btnLoader.hideLoader();
    this.loadingBar.complete();
    return this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error']
    });
  }
  getSuccessNotification(message) {
    this.btnLoader.hideLoader();
    // this.form.reset();
    this.loadingBar.complete();
    return this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['success']
    });
  }


  deleteDocx(id: number) {
    this.loadingBar.start();
    this.documentservice.deleteDocx(id)
      .subscribe(res => {
        if (res.message === 'Success') {
          this.getSuccessNotification('Document Deleted Successfully');
          return  this.getDocuments(this.currentId);
        }
        this.getErrorNotification('Document Failed to delete');
      }, err => this.getErrorNotification('Document Failed to delete'));
  }

  getUpdateDocx(row) {
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {data: row};
    this.dialog.open(DocumentUpdateComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.getDocuments(this.currentId);
      }
    );
  }


  getFileExt(file) {
    const extToArray = [...file];
    const extension = file.substring(extToArray.indexOf('.'));
    return extension;
  }

async getTeamProfiles(id) {
  this.service.getProjectTeamMembers(id).subscribe(({data}) => {
    this.teamprofiles = data;
    console.log(this.teamprofiles);
  });
}


async getDocuments(id: number){
  this.queryParam.projectid =id;
  this.service.getProjectDocx(this.queryParam)
  .subscribe(({data})=>{
    console.log(data)
    this.projectDocx = data.map((item: any) =>{
      const fileExt = this.getFileExt(item.docurl);
      return {...item, fileExt}
    } );
  }, err => this.projectDocx =[]);
 
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
    this.currentId = data.projectId;
    if (panelType === 'Team') { return this.getTeamProfiles(data.projectId); }
    if (panelType === 'Activities') { return this.getActivities(data.projectId); }
    if (panelType === 'Documents') {return this.getDocuments(data.projectId); }

  }
}
