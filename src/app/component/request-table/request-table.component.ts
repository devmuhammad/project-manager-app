import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatSnackBar} from '@angular/material';
import {SignupService} from '../../services/signup.service';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css'],
 
})

export class RequestTableComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private service: SignupService,
    private loaderService: LoadingBarService,
    ) { }
  displayedColumns: string[] = ['#', 'fullname',  'contactemail', 'phone', 'roletypes', 'actions', 'institution'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;


  dataSource: MatTableDataSource<any>;

  searchKey = ""

  fetchdata() {
    const authUser = JSON.parse(localStorage.getItem('profile'));
    this.loaderService.start();
    this.service.signUpRequest(authUser.id)
    .subscribe(({message, meta, data})=> {
      
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
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }


}
