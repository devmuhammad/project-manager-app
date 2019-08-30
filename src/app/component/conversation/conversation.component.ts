import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  public queryParam = {
    datefrom: '',
    dateto: '',
    enddate: '',
    institutionId:'',
    sFilter:'',
    page: 0,
    size: 20,
  };
  projects: any = [];

  constructor(private service: ProjectService,
              private loadingBar: LoadingBarService,
              private snackBar: MatSnackBar,
              private commonservice: DefaultlayoutService,
              private dialog: MatDialog) 
              { }

  ngOnInit() {
    this.getProjects();
  }


  getProjects() {
    this.service.getProjectList(this.queryParam)
    .subscribe(response => {
      if (response.message === 'Success') {
        this.projects = response.data.map(item => {
          return { ...item };
        });

        console.log(this.projects);
        
      }
    }, err => {
      this.snackBar.open('Network Failed', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    });
  }

}
