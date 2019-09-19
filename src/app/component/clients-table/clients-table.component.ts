import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ClientsService } from 'src/app/services/clients.service';
import { CreateClientComponent } from '../modals/create-client/create-client.component';
import { UpdateClientComponent } from '../modals/update-client/update-client.component';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {
  searchKey: string;
  constructor( private service: ClientsService,
               private dialog: MatDialog,
               private loadingBar: LoadingBarService,
               private snackBar: MatSnackBar
    ) { }

    /**
     * name: CLIENT PAYLOAD
     */
    public clientPayload() {
        return {
          'enddate': '',
          'institutionId': 0,
          'page': 0,
          'sfilter': '',
          'size': 50,
          'startdate': ''
        }
    }

  // tslint:disable-next-line: member-ordering
  displayedColumns: string[] = ['code', 'businessname', 'contactphone', 'contactemail', 'contactperson', 'datecreated', 'actions'];
  // tslint:disable-next-line: member-ordering
  @ViewChild(MatSort) sort: MatSort;
  // tslint:disable-next-line: member-ordering
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;


  getTableData() {
    this.loadingBar.start();
    this.service.getClients(this.clientPayload())
    .subscribe((client) => {
      const datarray = client.data.map(item => {
        return { ...item };
      });
      this.loadingBar.complete();
      this.dataSource = new MatTableDataSource(datarray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },err=>{
      this.loadingBar.complete();
      console.log(err);
      this.snackBar.open('Failed to Fetch Clients', 'Dismiss',
        {
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['error']
        });
    });
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';

    this.dialog.open(CreateClientComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.getTableData();
      }
    );
  }

  getDeleteClient(id: number){
    this.service.getDeleteClients(id)
    .subscribe(res=> {
      if(res.message ==='Success') {
        this.getTableData()
        this.snackBar.open('Client Deleted', 'Dismiss',
        {
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['success']
        }
        );
      }
    },err=>{
      this.snackBar.open('Failed to Deleted Clients', 'Dismiss',
      {
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['error']
      });
    });
  }

  getClientList(){
    this.service.getClients(this.clientPayload()).subscribe(res =>{
      console.log(res);
    },err => console.log(err))
  }
  getEditClient(row) {
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {data: row};
    this.dialog.open(UpdateClientComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.getTableData();
      }
    );
  }
  ngOnInit() {
   this.getTableData();
   this.getClientList();
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

}
