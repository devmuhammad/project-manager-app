import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { ClientsService } from 'src/app/services/clients.service';
import { CreateClientComponent } from '../modals/create-client/create-client.component';
import { UpdateClientComponent } from '../modals/update-client/update-client.component';


@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {
  searchKey: string;
  constructor( private service: ClientsService,
               private dialog: MatDialog,
    ) { }

  displayedColumns: string[] = ['name', 'contactphone', 'contactemail', 'contactperson', 'weburl', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;


  getTableData() {
    this.service.gettableData()
    .subscribe((client) => {
      const datarray = client.map(item => {
        return { ...item };
      });
      this.dataSource = new MatTableDataSource(datarray);
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  getDeleteClient(id){
    console.log(id);
  }

  getClientList(){
    this.service.getClients().subscribe(res =>{
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
