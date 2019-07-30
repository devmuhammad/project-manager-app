import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ProjectType, project } from 'src/app/reducer/project.reducer';
import { ProjectService } from '../../services/project.service';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})



export class ProjectTableComponent implements OnInit {



  // dataSource = new MatTableDataSource(tableData) ;
  constructor(private service: ProjectService) { }

  displayedColumns: string[] = ['#', 'name', 'status', 'date', 'activities', 'teams', 'document', 'webhooks', 'more'];
  message = 'hello';
  rowData: any;
  expand: boolean;
  dataSource: MatTableDataSource<any>;
  @Output() public getExpand = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  searchKey = '';

  toggleExpand(row) {
    console.log(row);
    this.expand = !this.expand;
    // this.rowData = {...row, expand: this.expand};
    console.log(this.expand);
    return this.getExpand.emit(this.expand);
  }
  ngOnInit() {
    this.expand = false;
    this.service.gettableData()
      .subscribe((projects) => {
        const datarray = projects.map(item => {
          return { ...item };
        });
        this.dataSource = new MatTableDataSource(datarray);
      });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

}
