import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort,MatPaginator} from '@angular/material'
import {ServerService} from '../../services/server.service'
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.css']
})
export class ServerDetailsComponent implements OnInit {
  displayedAccountColumns: string[] = ['#', 'name',  'provider', 'charges', 'actions'];
  displayedCredentialsColumns: string[] = ['#', 'username',  'password','ipAddress','OS','servername','Type','accountid','actions'];
  displayedToolsColumns: string[] = ['#',  'Database', 'applicationserver','credentialid','actions'];
  displayedApplications: string[] =['#','applicationname', 'utilid', 'actions'];
  constructor(private service: ServerService, private commonservice: DefaultlayoutService) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;

  accountdataSource: MatTableDataSource<any>
  toolsdataSource: MatTableDataSource<any>
  credentialsdataSource: MatTableDataSource<any>
  applicationdataSource: MatTableDataSource<any>
  ngOnInit() {
    this.commonservice.handleBreadChrome({parent: 'Settings', child: 'Server Details'});
    /* account data table*/
    this.service.getSeverAccount()
    .subscribe((account)=>{
      let dataArray =account.map((item)=>{
        return {...item}
      });
      this.accountdataSource = new MatTableDataSource(dataArray);
    })
    this.accountdataSource.sort =this.sort;
    this.accountdataSource.paginator = this.paginator;
     /* tools data table*/
     this.service.getServerTools()
    .subscribe((tools)=>{
      let dataArray =tools.map((item)=>{
        return {...item}
      });
      this.toolsdataSource = new MatTableDataSource(dataArray);
    })
    this.toolsdataSource.sort =this.sort;
    this.toolsdataSource.paginator = this.paginator;
    /* credentials data table*/
    this.service.getServerCredentials()
    .subscribe((cred)=>{
      let dataArray =cred.map((item)=>{
        return {...item}
      });
      this.credentialsdataSource = new MatTableDataSource(dataArray);
    })
    this.credentialsdataSource.sort =this.sort;
    this.credentialsdataSource.paginator = this.paginator;
    /**
     * Application data table config
     * */
    this.service.getServerApps()
    .subscribe((apps)=>{
      let dataArray =apps.map((item)=>{
        return {...item}
      });
      this.applicationdataSource = new MatTableDataSource(dataArray);
    })
    this.applicationdataSource.sort =this.sort;
    this.applicationdataSource.paginator = this.paginator;
  }
/*account table methods*/
  accountsearchKey=""
  onAccountSearchClear(){
    this.accountsearchKey="";
    this.applyAccountFilter();
  }
  applyAccountFilter(){
    this.accountdataSource.filter = this.accountsearchKey.trim().toLocaleLowerCase();
  }
  /* tools table methods */
  toolsearchKey=""
  onToolSearchClear(){
    this.toolsearchKey="";
    this.applyToolFilter();
  }
  applyToolFilter(){
    this.toolsdataSource.filter = this.toolsearchKey.trim().toLocaleLowerCase();
  }
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
    appSearchKey=""
    onAppSearchClear(){
      this.appSearchKey="";
      this.applyAppFilter();
    }
    applyAppFilter(){
      this.applicationdataSource.filter = this.appSearchKey.trim().toLocaleLowerCase();
    }
}
