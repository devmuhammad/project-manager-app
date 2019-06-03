import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort,MatPaginator} from '@angular/material'

export interface PeriodicElement {
  name: string;
  position: number;
  paradigm: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Introduction to C#', paradigm: 'OOP', symbol: 'C#'},
  {position: 2, name: 'Angular', paradigm: 'Scrypting', symbol: 'A'},
  {position: 3, name: 'React', paradigm: 'Scrypting', symbol: 'React'},
  {position: 4, name: 'Redux', paradigm: 'State Manager', symbol: 'RR'},
  {position: 5, name: 'ECMA Script', paradigm: 'Scrypting', symbol: 'ES'},
  {position: 6, name: 'Waterfall', paradigm:'Model' , symbol: 'W'},
  {position: 7, name: 'Prototyping', paradigm: 'Model', symbol: 'P'},
  {position: 8, name: 'SDLC', paradigm: 'Process', symbol: 'SDLC'},
  {position: 9, name: 'Mongo Db', paradigm: 'Database', symbol: 'MGDB'},
  {position: 10, name: 'GraphSql', paradigm: 'Database', symbol: 'GSql'},
];



@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'paradigm', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA) ;
  constructor() { }

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator)paginator :MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator =this.paginator;
  }


  applyFilter(value:string){
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
