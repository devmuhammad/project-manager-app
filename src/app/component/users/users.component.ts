

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { SignupService } from '../../services/signup.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';
import { map } from 'rxjs/operators';
import { UpdateUserModalComponent } from '../update-user-modal/update-user-modal.component';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private group: DropdownsService,
    private loaderService: LoadingBarService,
    private userService: UsersService,
  ) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  searchKey = "";
  groupList: any;
  allUsers: any;
  onCreate() {
    console.log(this.groupList)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '500px';
    dialogConfig.data = {group: this.groupList};
    this.dialog.open(NewUserModalComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.fetchdata();
      }
    );
  }
  getGroups() {
    this.group.getGroups().subscribe(res => {
      this.groupList = res.data.map(group=> {
        return {...group};
      });
    });
    
  }

  userActivation(id: number) {
    this.loaderService.start();
    const status = false;
    this.userService.getActivation(id, status).subscribe(response=> {
      if(response.message === 'Operation Successful') {
        this.snackBar.open('User Deactivated Sucessfully', 'Dismiss',
        {
          duration: 7000,
          direction: 'rtl',
          panelClass: ['success']
        })
        this.loaderService.complete();
        return this.fetchdata();
      }
      this.snackBar.open('User Deactivation Failed', 'Dismiss',
      {
        duration: 7000,
        direction: 'rtl',
        panelClass: ['error']
      })
      return this.loaderService.complete();
    })
  }
  editUser(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    dialogConfig.data = {data:row, group: this.groupList};
    this.dialog.open(UpdateUserModalComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.fetchdata();
      }
    );
  }
  // tslint:disable-next-line: member-ordering
  displayedColumns: string[] = ['#', 'fullname', 'contactemail', 'phone', 'roletypes', 'datecreated', 'actions'];


  showDetails(row) {
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    dialogConfig.data = {details: row, users: this.allUsers, group: this.groupList};
    this.dialog.open(UserDetailsComponent, dialogConfig);
  }
 
  // deletUser(id: number) {
  //   console.log(id);
  //   this.loaderService.start();
  //   this.userService.deleteUser(id)
  //   .subscribe(res=>{
  //     console.log(res);
  //     if (res.message === "Success") {
  //       this.snackBar.open("Deleted Successfully", "Dismiss",
  //       {
  //         duration: 7000,
  //         direction: 'rtl',
  //         panelClass: ['success']
  //       })
  //       return this.loaderService.complete();
  //     }
  //     this.snackBar.open("Fail to Delete User", "Dismiss",
  //     {
  //       duration: 7000,
  //       direction: 'rtl',
  //       panelClass: ['error']
  //     })
  //     return this.loaderService.complete();
  //   })
  // }

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
          this.allUsers = users;
          this.dataSource = new MatTableDataSource(users);
        } else {
          this.snackBar.open('Fail to load data', "Dismiss",
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
      },error=>{
        this.snackBar.open("Failed to load data Please try again", "Dismiss",
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
    this.getGroups();

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }


}
