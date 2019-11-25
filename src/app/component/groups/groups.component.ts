


import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import {MatTableDataSource, MatSort, MatPaginator, MatSnackBar} from '@angular/material';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { NewGroupModalComponent } from '../modals/new-group-modal/new-group-modal.component';
import { AngularButtonLoaderService } from 'angular-button-loader';
import { UpdateGroupModalComponent } from '../update-group-modal/update-group-modal.component';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit{
  constructor(
    private snackBar: MatSnackBar,
    private groupService: DropdownsService,
    private dialog: MatDialog,
    private btnLoader: AngularButtonLoaderService,
    private commonservice:DefaultlayoutService,
    private loaderService: LoadingBarService,
    ) { }
  roleList: '';
  displayedColumns: string[] = ['#', 'name',  'datecreated', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;
  // tslint:disable-next-line: member-ordering
  dataSource: MatTableDataSource<any>;

  searchKey = '';

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '320px';
    this.dialog.open(NewGroupModalComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.fetchdata();
      }
    );
  }

  fetchdata() {
    this.loaderService.start();
    this.groupService.getGroups()
    .subscribe(({message, meta, data})=> {
      
      console.log(data)
      if(message === 'Success') {
        let groups = data.map((grp: any) => {
          return {...grp};
        });
        this.dataSource = new MatTableDataSource(groups);
      }else{
        this.snackBar.open('Fail to load data', 'Dismiss',
        {
          duration: 7000,
          direction: 'rtl',
          panelClass: ['error']
        });
        return this.loaderService.complete();
      }
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      return this.loaderService.complete();
    });
  }

  getEditGroup(row) {
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '420px';
    dialogConfig.data = {roles: this.roleList, details: row};
    this.dialog.open(UpdateGroupModalComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.fetchdata();
      }
    );
  }
getRoles() {
  this.groupService.getRoles()
  .subscribe(({data}) => {
    console.log(data);
    this.roleList = data;
  });
}

  getDeleteGroup(id: number) {
    console.log(id);
    this.loaderService.start();
    this.groupService.deleteGroup(id)
    .subscribe(res => {
      console.log(res);
      if (res.message === 'Record Deactivate Successfully') {
        this.snackBar.open(res.message, 'Dismiss',
        {
          duration: 7000,
          direction: 'rtl',
          panelClass: ['success']
        })
        this.loaderService.complete();

        return this.fetchdata();
      }
      this.snackBar.open('Fail to Delete group', 'Dismiss',
      {
        duration: 7000,
        direction: 'rtl',
        panelClass: ['error']
      });
      return this.loaderService.complete();
    });
  }


   ngOnInit() {
    this.fetchdata();
    this.getRoles();
    this.commonservice.handleBreadChrome({parent:'Users',child :'Group'});
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }


}
