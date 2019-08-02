
import { MatTableDataSource, MatSort, MatPaginator,
  MatDialogConfig, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ViewChild, OnInit, Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { CreateProjectTypeModalComponent } from '../modals/create-project-type-modal/create-project-type-modal.component';
import { UpdateProjectTypeModalComponent } from '../modals/update-project-type-modal/update-project-type-modal.component';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { CreateTaskTypeModalComponent } from '../modals/create-task-type-modal/create-task-type-modal.component';
import { UpdateTaskTypeModalComponent } from '../modals/update-task-type-modal/update-task-type-modal.component';


@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.css']
})
export class TaskTypeComponent implements OnInit {
 searchKey: string;
 constructor( private service: ProjectService,
              private dialog: MatDialog,
              private loadingBar: LoadingBarService,
              private snackBar: MatSnackBar
   ) { }

 displayedColumns: string[] = ['#', 'code', 'description',  'actions'];
 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 dataSource: MatTableDataSource<any>;


 getTableData() {
   this.loadingBar.start();
   this.service.getProjectType()
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
   }, err => {
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

   this.dialog.open(CreateTaskTypeModalComponent, dialogConfig).afterClosed().subscribe(
     () => {
       this.getTableData();
     }
   );
 }

 getDeleteClient(id){
   console.log(id);
 }

 
 getEditType(row) {
   console.log(row);
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.width = '30%';
   dialogConfig.data = {data: row};
   this.dialog.open(UpdateTaskTypeModalComponent, dialogConfig).afterClosed().subscribe(
     () => {
       this.getTableData();
     }
   );
 }
 ngOnInit() {
  this.getTableData();
 }
 onSearchClear() {
   this.searchKey = '';
   this.applyFilter();
 }
 applyFilter() {
   this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
 }

}
