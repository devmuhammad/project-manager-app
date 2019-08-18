
import {
  MatTableDataSource, MatSort, MatPaginator,
  MatDialogConfig, MatDialogRef, MatDialog, MatSnackBar
} from '@angular/material';
import { ViewChild, OnInit, Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ActivityService } from 'src/app/services/activity.service';
import { CreateDocTypeModalComponent } from '../modals/create-doc-type-modal/create-doc-type-modal.component';
import { UpdateDoctypeModalComponent } from '../modals/update-doctype-modal/update-doctype-modal.component';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent implements OnInit {

  searchKey: string;
  constructor(private service: ActivityService,
              private dialog: MatDialog,
              private loadingBar: LoadingBarService,
              private commonservice: DefaultlayoutService,
              private snackBar: MatSnackBar
  ) { }

  displayedColumns: string[] = ['#', 'description', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;


  getTableData() {
    this.loadingBar.start();
    this.service.getdocumentType()
      .subscribe((response) => {
        if (response.message === 'Success') {
          this.loadingBar.complete();
          const datarray = response.data.map(item => {
            return { ...item };
          });
          this.dataSource = new MatTableDataSource(datarray);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }, err => {
        console.log(err);
        this.loadingBar.complete();
        this.snackBar.open('Network Failed', 'Dismiss', {
          panelClass: ['error'],
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';

    this.dialog.open(CreateDocTypeModalComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.getTableData();
      }
    );
  }

  getDelete(id: number) {
    console.log(id);
    this.loadingBar.start();
    this.service.deleteDocType(id)
      .subscribe(res => {
        console.log(res);
        if (res.message === 'Success') {
          this.snackBar.open(res.message, 'Dismiss',
            {
              duration: 7000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['success']
            });
          this.loadingBar.complete();

          return this.getTableData();
        }

        return this.loadingBar.complete();
      }, err => {
        console.log(err);
        this.snackBar.open('Fail to Delete Doc Type', 'Dismiss',
          {
            duration: 7000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['error']
          });
      }
      );
  }


  getEditType(row) {
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = { data: row };
    this.dialog.open(UpdateDoctypeModalComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.getTableData();
      }
    );
  }
  ngOnInit() {
    this.getTableData();
    this.commonservice.handleBreadChrome({parent: 'Settings', child: 'Doc. Type'});
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

}
