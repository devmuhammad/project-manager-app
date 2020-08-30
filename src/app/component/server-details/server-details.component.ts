import { Component, OnInit,ViewChild, Input } from '@angular/core';
import {MatTableDataSource, MatSort,MatPaginator, MatDialog, MatDialogConfig} from '@angular/material'
import {ServerService} from '../../services/server.service'
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';

import { AddServerCredentialComponent } from '../modals/add-server-credentials/add-server-credential.component'

@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.css']
})
export class ServerDetailsComponent implements OnInit {
 
  displayedCredentialsColumns: string[] = ['#', 'username',  'password','ipAddress','OS','servername','Type','actions'];
  @Input() project: any 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;
 
  constructor(private service: ServerService, 
              private commonservice: DefaultlayoutService,
              private dialog: MatDialog ) { }
  
  projId: any
  searchKey: '';
  credentials : any
  credentialsdataSource: MatTableDataSource<any>
 
  ngOnInit() {
    this.commonservice.handleBreadChrome({parent: 'Settings', child: 'Server'});

    /* credentials data table*/
    this.projId = this.project.projectId
    this.getCreds()
    /**
     * Application data table config
     * */
  //   this.service.getServerApps()
  //   .subscribe((apps)=>{
  //     let dataArray = apps.map((item)=>{
  //       return {...item}
  //     });
  //     this.applicationdataSource = new MatTableDataSource(dataArray);
  //   })
  //   this.applicationdataSource.sort =this.sort;
  //   this.applicationdataSource.paginator = this.paginator;
  }

  deleteServer(id){
    this.service.deleteServerCredential(id)
    .subscribe((res)=>{
        if (res.message === "Success"){
          this.getCreds()
        }
    })
 }

    getCreds(){
      this.service.getServerCredentialsProject(this.projId)
      .subscribe((cred)=>{
        let dataArray = cred.data
        this.credentials = cred.data
        // map((item)=>{
        //   return {...item}
        // });
        this.credentialsdataSource = new MatTableDataSource(dataArray);
      })
      this.credentialsdataSource.sort =this.sort;
      this.credentialsdataSource.paginator = this.paginator;
  
    }

   openNew(el){
     if (el){
       this.project = {...this.project, ...el}
     }else {
      const projId = this.project.projectId
      const projname = this.project.projectname
      this.project = {}
      this.project.projectid = projId
      this.project.projectname = projname
    }
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = this.project
  dialogConfig.width = '30%';
  this.dialog.open(AddServerCredentialComponent, dialogConfig).afterClosed().subscribe(() => {
    // this.updateRecord();
    this.getCreds()

  }
  );
}


/*account table methods*/
  
   /* credentials table methods */
   credentialsSearchKey=""
   onCredSearchClear(){
     this.credentialsSearchKey="";
     this.applyCredFilter();
   }
   applyCredFilter(){
     this.credentialsdataSource.filter = this.credentialsSearchKey.trim().toLocaleLowerCase();
   }
    /* Applications table methods */
   
}
