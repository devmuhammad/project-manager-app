

import { MatTableDataSource, MatSort, MatPaginator,
   MatDialogConfig, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ViewChild, OnInit, Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { CreateProjectTypeModalComponent } from '../modals/create-project-type-modal/create-project-type-modal.component';
import { UpdateProjectTypeModalComponent } from '../modals/update-project-type-modal/update-project-type-modal.component';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
  styleUrls: ['./project-type.component.css']
})

export class ProjectTypeComponent implements OnInit {
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

    this.dialog.open(CreateProjectTypeModalComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.getTableData();
      }
    );
  }

 
  getDelete(id: number) {
    console.log(id);
    this.loadingBar.start();
    this.service.deleteProjectType(id)
      .subscribe(res => {
        if (res.message === 'Success') {
          this.snackBar.open(`Deleted ${res.message}`, 'Dismiss',
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
        this.snackBar.open('Fail to Delete Project Type', 'Dismiss',
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
    dialogConfig.data = {data: row};
    this.dialog.open(UpdateProjectTypeModalComponent, dialogConfig).afterClosed().subscribe(
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
