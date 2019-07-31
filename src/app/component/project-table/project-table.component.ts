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


public queryParam = {
  datecreatedfrom: '1567810800000',
  datecreatedto: '1567810800000',
  enddate: '1567810800000',
  page: 1,
  sfielter: '',
  size: 20,
  startdate: '1567810800000'
};
  // dataSource = new MatTableDataSource(tableData) ;
  constructor(private service: ProjectService) { }

  displayedColumns: string[] = ['alias', 'name',  'status', 'date', 'activities', 'teams', 'document', 'webhooks', 'more'];
  message = 'hello';
  rowData: any;
  expand: boolean;
  dataSource: MatTableDataSource<any>;
  @Output() public getExpand = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  searchKey = '';

  toggleExpand(row, panel) {
    console.log(row);
    this.expand = !this.expand;
    // this.rowData = {...row, expand: this.expand};
    console.log(this.expand);
    return this.getExpand.emit({showDrawer: this.expand, panelType: panel, data: row});
  }

  getDataTable() {
  }
  async ngOnInit() {
    this.expand = false;
    this.service.getProjectList(this.queryParam);
    const datarray = await this.service.getProjectList(this.queryParam);
    this.dataSource = await new MatTableDataSource(datarray);
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
