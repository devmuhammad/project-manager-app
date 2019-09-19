



import { MatTableDataSource, MatSort, MatPaginator,
  MatDialogConfig, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ViewChild, OnInit, Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { CreateStatusModalComponent } from '../modals/create-status-modal/create-status-modal.component';
import { UpdateStatusModalComponent } from '../modals/update-status-modal/update-status-modal.component';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';


@Component({
  selector: 'app-status-types',
  templateUrl: './status-types.component.html',
  styleUrls: ['./status-types.component.css']
})
export class StatusTypesComponent implements OnInit {

 searchKey: string;
 institutionList: any[];
 constructor( private service: ProjectService,
              private dialog: MatDialog,
              private dropdownService: DropdownsService,
              private loadingBar: LoadingBarService,
              private snackBar: MatSnackBar,
              private commonservice: DefaultlayoutService
   ) { }

 displayedColumns: string[] = ['#', 'code', 'description',  'actions'];
 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 dataSource: MatTableDataSource<any>;


 getTableData() {
   this.loadingBar.start();
   this.service.getStatusList()
   .subscribe((response) => {
     if(response.message === 'Success'){
       this.loadingBar.complete();
       const datarray = response.data.map(item => {
         return { ...item };
       });
       this.dataSource = new MatTableDataSource(datarray);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     }
   },err=>{
     console.log(err);
     this.loadingBar.complete();
     this.snackBar.open('Network Failed', 'Dismiss', {
         panelClass:['error'],
       verticalPosition: 'bottom',
       horizontalPosition: 'right'
     })
   });
 }
 onCreate() {
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.width = '30%';

   this.dialog.open(CreateStatusModalComponent, dialogConfig).afterClosed().subscribe(
     () => {
       this.getTableData();
     }
   );
 }

 getDeleteType(id){
  this.service.getDeleteStatus(id)
  .subscribe(res=> {
    if(res.message ==='Success') {
      this.getTableData()
      this.snackBar.open('Status Deleted', 'Dismiss',
      {
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['success']
      }
      );
    }
  },err=>{
    this.snackBar.open('Failed to Deleted Status', 'Dismiss',
    {
      duration: 7000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['error']
    });
  });
 }

 fetchInstitutionList() {
  this.dropdownService.getInstitutions()
    .subscribe((res) => {
      this.institutionList = res.data;
      console.log(this.institutionList);
    });
}
 getEditType(row) {
   console.log(row);
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.width = '30%';
   dialogConfig.data = {data: row, institutions: this.institutionList};
   this.dialog.open(UpdateStatusModalComponent, dialogConfig).afterClosed().subscribe(
     () => {
       this.getTableData();
     }
   );
 }
 ngOnInit() {
  this.getTableData();
  this.fetchInstitutionList();
  this.commonservice.handleBreadChrome({parent: 'Settings', child: 'Status Type'});
 }
 onSearchClear() {
   this.searchKey = '';
   this.applyFilter();
 }
 applyFilter() {
   this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
 }

}
