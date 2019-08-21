import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { ProjectType, project } from 'src/app/reducer/project.reducer';
import { ProjectService } from '../../services/project.service';
import { Subject } from 'rxjs';
import { CreateProjectModalComponent } from '../create-project-modal/create-project-modal.component';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';



@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})



export class ProjectTableComponent implements OnInit {


  public queryParam = {
    datefrom: '',
    dateto: '',
    enddate: '',
    institutionId:'',
    sFilter:'',
    page: 0,
    size: 20,
  };

  selectedrow = -1;
  // dataSource = new MatTableDataSource(tableData) ;
  constructor(private service: ProjectService,
              private loadingBar: LoadingBarService,
              private snackBar: MatSnackBar,
              private commonservice: DefaultlayoutService,
              private dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['alias', 'name', 'status', 'date', 'activities', 'teams', 'document', 'webhooks', 'more'];
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
    return this.getExpand.emit({ showDrawer: this.expand, panelType: panel, data: row });
  }

  getDataTable() {
  }
  async ngOnInit() {
    this.expand = false;
    this.commonservice.handleBreadChrome({parent: 'Settings', child: 'Project Type'});
    this.updateRecord();
  }

  onCreate() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '55%';
    this.dialog.open(CreateProjectModalComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.updateRecord();
      }
    );
  }

  updateRecord() {
    this.loadingBar.start();
    this.service.getStatusList();
    this.service.getProjectList(this.queryParam)
      .subscribe(response => {
        if (response.message === 'Success') {
          this.loadingBar.complete();
          const datarray = response.data.map(item => {
            return { ...item };
          });
          this.dataSource = new MatTableDataSource(datarray);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }, err => {
        console.log(err);
        this.loadingBar.complete();
        this.snackBar.open('Network Failed', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

}
