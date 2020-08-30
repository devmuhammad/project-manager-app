import { Component, OnInit,ViewChild, Input } from '@angular/core';
import {MatTableDataSource, MatSort,MatPaginator, MatDialogConfig, MatDialog} from '@angular/material'
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { ServerService } from 'src/app/services/server.service';
import { AddServerAccountComponent } from '../../modals/add-server-account/add-server-account.component'
@Component({
  selector: 'app-server-account',
  templateUrl: './server-account.component.html',
  styleUrls: ['./server-account.component.css']
})
export class ServerAccountComponent implements OnInit {
  displayedAccountColumns: string[] = ['#', 'name',  'provider', 'charges','status', 'actions'];
  projId: any;
  
  constructor(private service: ServerService, 
    private commonservice: DefaultlayoutService,
    private dialog: MatDialog ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;
  
  @Input() project: any 
  account: any
  searchKey: '';
  accountdataSource: MatTableDataSource<any>
  

  ngOnInit() {
    // this.commonservice.handleBreadChrome({parent: 'Pro', child: 'Server'});
    /* account data table*/
    this.projId = this.project.projectId
    this.getAcct()
     /* tools data table*/
   
    /* credentials data table*/
  
    /**
     * Application data table config
     * */

  }

  deleteServer(id){
    this.service.deleteServerAccount(id)
    .subscribe((res)=>{
        if (res.message === "Success"){
          this.getAcct()
        }
    })
 }

  getAcct(){
    this.service.getServerAccountProject(this.projId)
    .subscribe((account)=>{
      
      let dataArray = account.data
      this.account = account.data
      // .map((item)=>{
      //   return {...item}
      // });
      this.accountdataSource = new MatTableDataSource(dataArray);
    })
    this.accountdataSource.sort = this.sort;
    this.accountdataSource.paginator = this.paginator;
  }

  showStatus(status){
    if(status === 'active'){
      return 'Suspend'
    }else return 'Activate'
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
  this.dialog.open(AddServerAccountComponent, dialogConfig).afterClosed().subscribe(() => {
    // this.updateRecord();
    this.getAcct()
  }
  );
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
  
}
