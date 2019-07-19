

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { SignupService } from '../../services/signup.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private loaderService: LoadingBarService,
    private userService: UsersService,
  ) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  searchKey = "";

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    this.dialog.open(NewUserModalComponent,{
      height: '400px',
      width: '600px',
      autoFocus: true,
      disableClose: true,
    });
  }
  // tslint:disable-next-line: member-ordering
  displayedColumns: string[] = ['#', 'fullname', 'contactemail', 'phone', 'roletypes', 'datecreated', 'actions', 'institution'];



  deletUser(id: number) {
    console.log(id);
    this.loaderService.start();
    this.userService.deleteUser(id)
    .subscribe(res=>{
      console.log(res);
      if (res.message === "Success") {
        this.snackBar.open("Deleted Successfully", "Dismiss",
        {
          duration: 7000,
          direction: 'rtl',
          panelClass: ['success']
        })
        return this.loaderService.complete();
      }
      this.snackBar.open("Fail to Delete User", "Dismiss",
      {
        duration: 7000,
        direction: 'rtl',
        panelClass: ['error']
      })
      return this.loaderService.complete();
    })
  }

  fetchdata() {
    const authUser = JSON.parse(localStorage.getItem('profile'));
    this.loaderService.start();
    this.userService.userList(authUser.id)
      .subscribe(({ message, data }) => {

        console.log(data)
        if (message === "Success") {
          let users = data.map((user: any) => {
            return { ...user };
          });
          this.dataSource = new MatTableDataSource(users);
        } else {
          this.snackBar.open("Fail to load data", "Dismiss",
            {
              duration: 7000,
              direction: 'rtl',
              panelClass: ['error']
            })
          return this.loaderService.complete();
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return this.loaderService.complete();
      });
  }


  ngOnInit() {
    this.fetchdata();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }


}
