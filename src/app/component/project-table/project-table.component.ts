import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ProjectType, project } from 'src/app/reducer/project.reducer';
import { ProjectService } from '../../services/project.service';



@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {
  // dataSource = new MatTableDataSource(tableData) ;
  constructor(private service: ProjectService) { }

  displayedColumns: string[] = ['#', 'name', 'status', 'date', 'actions', 'more'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>

  searchKey = '';
  ngOnInit() {
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
