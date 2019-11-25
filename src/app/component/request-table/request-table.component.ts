import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialogConfig, MatDialog} from '@angular/material';
import {SignupService} from '../../services/signup.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { ApprovalModalComponent } from '../approval-modal/approval-modal.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css'],
 
})

export class RequestTableComponent implements OnInit {
  groupList: any;
  constructor(
    private snackBar: MatSnackBar,
    private service: SignupService,
    private dialog: MatDialog,
    private userService: UsersService,
    private group: DropdownsService,
    private loaderService: LoadingBarService,
    ) { }
  displayedColumns: string[] = ['#', 'fullname',  'contactemail', 'phone', 'roletypes', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;


  dataSource: MatTableDataSource<any>;

  searchKey = '';
  allUsers: '';
  getGroups() {
    this.group.getGroups().subscribe(res => {
      this.groupList = res.data.map(group=> {
        return {...group};
      });
    });
    
  }
  userApproval(id: number) {
    console.log(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {user: id, group: this.groupList};
    this.dialog.open(ApprovalModalComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.fetchdata();
      });
  }

  fetchApprovedusers() {
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
          // this.snackBar.open("Fail to load data", "Dismiss",
          //   {
          //     duration: 7000,
          //     direction: 'rtl',
          //     panelClass: ['error']
          //   })
          return this.loaderService.complete();
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return this.loaderService.complete();
      },error=>{
        // this.snackBar.open("Failed to load data Please try again", "Dismiss",
        // {
        //   duration: 7000,
        //   direction: 'rtl',
        //   panelClass: ['error']
        // });
        return this.loaderService.complete();
      });
  }
  showDetails(row) {
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {details: row, users: this.allUsers, activities: false,  group: this.groupList};
    this.dialog.open(UserDetailsComponent, dialogConfig);
  }
  fetchdata() {
    const authUser = JSON.parse(localStorage.getItem('profile'));
    this.loaderService.start();
    this.service.signUpRequest(authUser.id)
    .subscribe(({message, meta, data}) => {
      console.log(data)
      if(message === "Success") {
        let users = data.map((user: any) => {
          return {...user};
        });
        this.dataSource = new MatTableDataSource(users);
      }else{
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
    this.getGroups();
    this.fetchApprovedusers();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }


}
