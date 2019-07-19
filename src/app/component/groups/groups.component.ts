


import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatSnackBar} from '@angular/material';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { DropdownsService } from 'src/app/services/dropdowns.service';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit{
  constructor(
    private snackBar: MatSnackBar,
    private groupService: DropdownsService,
    private loaderService: LoadingBarService,
    ) { }
  displayedColumns: string[] = ['#', 'name',  'datecreated', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;


  dataSource: MatTableDataSource<any>;

  searchKey = "";

  fetchdata() {
    this.loaderService.start();
    this.groupService.getGroups()
    .subscribe(({message, meta, data})=> {
      
      console.log(data)
      if(message === "Success") {
        let groups = data.map((grp: any) => {
          return {...grp};
        });
        this.dataSource = new MatTableDataSource(groups);
      }else{
        this.snackBar.open("Fail to load data", "Dismiss",
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
