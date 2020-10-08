



import { MatTableDataSource, MatSort, MatPaginator,
  MatDialogConfig, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ViewChild, OnInit, Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { CreateReasonComponent } from '../modals/create-reason/create-reason.component';
import { UpdateReasonComponent } from '../modals/update-reason/update-reason.component';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { ReasonService } from 'src/app/services/reason.service';


@Component({
  selector: 'app-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.css']
})
export class ReasonsComponent implements OnInit {

 searchKey: string;
 constructor( private service: ReasonService,
              private dialog: MatDialog,
              private loadingBar: LoadingBarService,
              private snackBar: MatSnackBar,
              private commonservice: DefaultlayoutService
   ) { }

 displayedColumns: string[] = ['#', 'description',  'comments', 'actions'];
 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 dataSource: MatTableDataSource<any>;


 getTableData() {
   this.loadingBar.start();
   this.service.getReasons()
   .subscribe((response) => {
     if(response.message === 'true'){
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

   this.dialog.open(CreateReasonComponent, dialogConfig).afterClosed().subscribe(
     () => {
       this.getTableData();
     }
   );
 }

 getDeleteType(id){
  this.service.deleteReason(id)
  .subscribe(res=> {
    if(res.message ==='Success') {
      this.getTableData()
      this.snackBar.open('Reason Deleted', 'Dismiss',
      {
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['success']
      }
      );
    }
  },err=>{
    this.snackBar.open('Failed to Deleted Reason', 'Dismiss',
    {
      duration: 7000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['error']
    });
  });
 }

 
 getEditType(row) {
   console.log(row);
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.width = '30%';
   dialogConfig.data = {data: row};
   this.dialog.open(UpdateReasonComponent, dialogConfig).afterClosed().subscribe(
     () => {
       this.getTableData();
     }
   );
 }
 ngOnInit() {
  this.getTableData();
  this.commonservice.handleBreadChrome({parent: 'Settings', child: 'Reasons'});
 }
 onSearchClear() {
   this.searchKey = '';
   this.applyFilter();
 }
 applyFilter() {
   this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
 }

}
