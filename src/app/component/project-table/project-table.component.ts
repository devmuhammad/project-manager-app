import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { ProjectType, project } from 'src/app/reducer/project.reducer';
import { ProjectService } from '../../services/project.service';
import { Subject } from 'rxjs';
import { CreateProjectModalComponent } from '../create-project-modal/create-project-modal.component';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { ActivityService } from 'src/app/services/activity.service';
import { BottomSheetComponent } from 'src/app/component/bottom-sheet/bottom-sheet.component';




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
              private activityService: ActivityService,
              private loadingBar: LoadingBarService,
              private snackBar: MatSnackBar,
              private commonservice: DefaultlayoutService,
              private dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['alias', 'name', 'status', 'date', 'activities', 'teams', 'document', 'action'];
  message = 'hello';
  rowData: any;
  expand: boolean;
  dataSource: MatTableDataSource<any>;
  @Output() public getExpand = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public param = {
    page: 0 as number,
    assigntoid: 0 as number,
    size: 20 as number,
  };
  projArray = [];
  searchKey = '';
  name: '';
  alias: '';
  todayDate= new Date().toDateString();
  completedProj: number = 0
  totalProj: number = 0
  uncompletedProj: number = 0
  ongoingProj: number = 0
  projectsProgress: number = 0
  status: [];
  activityList: [];
  taskList: any[];
  actionflow = 'TASK';
  taskcomplete = false;
  isAdmin= false
  currUser :any;
  statusList = []

  toggleExpand(row, panel) {
    // console.log(row);
    this.expand = true;
    // this.rowData = {...row, expand: this.expand};
    // console.log(this.expand);
    return this.getExpand.emit({ showDrawer: this.expand, panelType: panel, data: row });
  }

  getDataTable() {
  }
  async ngOnInit() {
    const profile = JSON.parse(localStorage.getItem('profile'))
    this.currUser = profile
    
    const userType = localStorage.getItem('userType')
    if (userType === 'admin') { this.isAdmin = true
    }else this.isAdmin = false

    this.fetchOwntaskList(profile.id);
    this.getProfile(this.commonservice.user);
    this.expand = false;
    this.commonservice.handleBreadChrome({parent: 'Settings', child: 'Project Type'});
    this.updateRecord();
  }

    projSearchKey=""
    onAppSearchClear(){
      this.projSearchKey="";
      this.applyProjFilter();
    }
    applyProjFilter(){
    //  return this.projArray.filter(this.projSearchKey.trim().toLocaleLowerCase());
    }

  setComplete(){
    this.taskcomplete = !this.taskcomplete
  }

  newTask() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this.dialog.open(BottomSheetComponent, dialogConfig);
  }

  isCompleted(status){
    if (status === 'Completed') return true
    else return false
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

  getProfile({ fullname, username }) {
    // console.log(fullname);
    this.name = fullname;
    this.alias = username;
  }

  putDetails(datarray){
   
    this.totalProj = datarray.length
    datarray.forEach(element => {
      if (element.projectstatus === 'string'){
        this.ongoingProj++
        this.uncompletedProj++
      }else if (element.projectstatus === 'Completed'){
        this.completedProj++;
      }else this.uncompletedProj++
    })

    this.projectsProgress = Math.round(100/this.totalProj*this.completedProj)
  }

  deadlineDate(date){
    return new Date(date).toDateString()
  }

  async fetchOwntaskList(id) {
    this.loadingBar.start();
    this.param.assigntoid = id;
    await this.activityService.getAssigneeActivities(this.param)
      .subscribe(({ message, data }) => {
        if (message === 'Success') {
          this.loadingBar.complete();
          this.activityList = data.map((item: any) => ({ ...item }));
          // console.log(this.activityList);
          this.taskList = this.activityList.filter((item: any) => item.actionflow === this.actionflow);

        } else {
          this.activityList = [];
        }
      }, err => {
        console.log(err);
        return this.activityList = [];
      });
  }

  async getTeamProfiles(project) {
   
    this.service.getProjectTeamMembers(project.projectId).subscribe(async ({data}) => {
      const prjArray = []
      
      if( data.includes(data.find(async e => e.id == this.currUser.id))){
         prjArray.push(project)
         console.log(prjArray)
      }
      this.projArray = prjArray
      this.putDetails(this.projArray)
      this.loadingBar.complete();
      // return data;
      // console.log(this.projArray);
    });
  }

  updateRecord() {
    this.loadingBar.start();
    this.service.getStatusList().subscribe(async res => {if(res.message === 'Success'){
      this.statusList = res.data
      console.log(this.statusList)
    }});
    this.service.getProjectList(this.queryParam)
      .subscribe(async response => {
        if (response.message === 'Success') {
          
          const datarray = await response.data.map(item => {
            return { ...item };
          });
          // console.log(datarray)
          if (!this.isAdmin){
          this.projArray = datarray
           this.putDetails(datarray)
            }else {

             await datarray.forEach(async el => {
               if (el.teamMemberCounts >= 1){
                 await this.getTeamProfiles(el)
    
               }
             }) 
            //  this.projArray = prjArray
            //  this.putDetails(prjArray)
            //  console.log(prjArray)
          }
          
          // this.putDetails(datarray)
          // this.dataSource = new MatTableDataSource(datarray);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
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
