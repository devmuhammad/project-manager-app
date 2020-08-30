import { Component, OnInit,OnChanges, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { ProjectType, project } from 'src/app/reducer/project.reducer';
import { ProjectService } from '../../services/project.service';
import { Subject } from 'rxjs';
import { CreateProjectModalComponent } from '../create-project-modal/create-project-modal.component';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { ActivityService } from 'src/app/services/activity.service';
import { BottomSheetComponent } from 'src/app/component/bottom-sheet/bottom-sheet.component';
import { UsersService } from 'src/app/services/users.service';
import { RepositoryComponent } from 'src/app/component/modals/repository/repository.component'
import { ReassignProjectComponent } from 'src/app/component/modals/reassign-project/reassign-project.component'
import { ProjectTimelineComponent } from 'src/app/component/modals/project-timeline/project-timeline.component'
import { ServerCredentialsComponent } from 'src/app/component/modals/server-credentials/server-credentials.component'


@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
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
              private userService: UsersService,

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
  @Input() stats: boolean;

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
  completedTask: number = 0
  totalProj: number = 0
  uncompletedProj: number = 0
  uncompletedTask: number = 0
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
  myTasks: number = 0
  projSearchKey = ''
  allprojs = []
  sideOpened = true
  userLabel = ''
  userList : any[]
  filtTaskList: any[]
  currtaskProj: null
  statsList = []

  toggleExpand(row, panel) {
    // console.log(row);
    this.expand = true;
    this.sideOpened = true
    // this.rowData = {...row, expand: this.expand};
    // console.log(this.expand);
    return this.getExpand.emit({ showDrawer: this.expand, panelType: panel, data: row });
  }

  openTask(){
    this.sideOpened = !this.sideOpened
  }

  getDataTable() {
  }

  async ngOnInit() {
    const profile = JSON.parse(localStorage.getItem('profile'))
    this.currUser = profile
    
    const userType = localStorage.getItem('userType')
    if (userType === 'admin') { 
      this.isAdmin = true
      this.fetchAllTasks()
      // this.fetchOwntaskList(profile.id);
      this.fetchUsersList(profile.id)

    }else {
      this.isAdmin = false
      this.fetchOwntaskList(profile.id);
    }
    
    this.getProfile(this.commonservice.user);
    this.expand = false;
    this.commonservice.handleBreadChrome({parent: 'Settings', child: 'Project Type'});
    this.updateRecord();
  }

  fetchUsersList(payload) {
    this.userLabel = 'Fetching users...';
    this.userService.userList(payload)
      .subscribe(({ meta, data, message }) => {
        if (message === 'Success') {
          this.userLabel = 'Assigned to';
          // console.log(data);
          this.userList = data.map(item => {
            return { ...item };
          });
        }
      }, err => this.userLabel = 'Could\'nt fetch users');
  }

  async getTasks(project){
    // console.log(project)
    
  if (!this.isAdmin){
    return ;
  }
  this.openTask()
  this.currtaskProj = project.projectId
  this.loadingBar.start();
    await this.service.getTaskByProject(project.projectId)
    .subscribe(async({ message, data }) => {
      if (message) {
        this.taskList = data.map((item: any) => ({ ...item }));
        this.loadingBar.complete();
  }
})
  }

  async setComplete(task){
    // this.taskcomplete = !this.taskcomplete
      const status = "Complete"
      await this.updateTaskStatus(task, status)
  }

  newTask() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.currtaskProj
    dialogConfig.width = '40%';
    this.dialog.open(BottomSheetComponent, dialogConfig).afterClosed().subscribe(data => {
      if(data && data.action === 1) {
        if (this.isAdmin){
          this.fetchAllTasks()
          // this.fetchOwntaskList(this.currUser.id)
        }else this.fetchOwntaskList(this.currUser.id)
        
      }
    });;
  }

  reassignProj(data) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data
    dialogConfig.width = '30%';
    this.dialog.open(ReassignProjectComponent, dialogConfig).afterClosed().subscribe(() => {
      this.updateRecord();
    }
    );
  }

  projectTimeline(data){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data
    dialogConfig.width = '40%';
    this.dialog.open(ProjectTimelineComponent, dialogConfig).afterClosed().subscribe(() => {
      // this.updateRecord();
    }
    );
  }



  repo(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data 
    dialogConfig.width = '30%';
    this.dialog.open(RepositoryComponent, dialogConfig).afterClosed().subscribe(data => {
      if(data && data.action === 1) {
        
      }
    });;
  }

  serverCreds(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data 
    dialogConfig.width = '70%';
    this.dialog.open(ServerCredentialsComponent, dialogConfig).afterClosed().subscribe(data => {
      if(data && data.action === 1) {
        
      }
    });;
  }

  isCompleted(status){
    if (status === 'Completed') return true
    else return false
  }

  onCreate() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '45%';
    this.dialog.open(CreateProjectModalComponent, dialogConfig).afterClosed().subscribe(
      () => {
        this.updateRecord();
      }
    );
  }

   async fetchAllTasks(){
    this.loadingBar.start();

    await this.service.getTasksList(this.queryParam)
      .subscribe(async response => {
        if (response.message === 'Success') {
          this.taskList = await response.data.map(item => {
            return { ...item };});
            this.filtTaskList = await response.data.map(item => {
              return { ...item };});
            this.loadingBar.complete();
            // console.log(this.taskList)
        }
      },err => {
        console.log(err);
        return this.taskList = [];
      })
  }

  getProfile({ fullname, username }) {
    // console.log(fullname);
    this.name = fullname;
    this.alias = username;
  }

  async putDetails(datarray){
    // if (datarray){
    this.totalProj = datarray.length
    datarray.forEach(element => {
      if (element.projectstatus === 'Ongoing' || element.projectstatus === 'Initiated'){
        this.ongoingProj++
        // this.uncompletedProj++
      }else if (element.projectstatus === 'Completed'){
        this.completedProj++;
      }else if (element.projectstatus === 'Started' || element.projectstatus === 'Stopped' || element.projectstatus === 'Suspended'){
        this.uncompletedProj++}
    })

   
  // }
  }

  async taskDetails(){
    this.myTasks = this.taskList.length

    this.taskList.forEach(el => {
     if (el.status === 'Completed'){
        this.completedTask++
      }else if (el.status === 'Ongoing' || el.status === 'Initiated' || el.status === 'Started'){
        this.uncompletedTask++
      }
      
    })

    this.projectsProgress = Math.round(100/this.myTasks*this.completedTask)
  }

  passDeadline(date){
    if (new Date() > new Date(date)){
      return true
    }else return false
  }

  deadlineDate(date){
    return new Date(date).toDateString()
  }

  async fetchOwntaskList(id) {
    this.loadingBar.start();
    this.param.assigntoid = id;
    await this.service.getAssigneeTasks(this.param)
      .subscribe(async({ message, data }) => {
        if (message === 'Success') {
          this.taskList = data.map((item: any) => ({ ...item }));
          this.filtTaskList = data.map((item: any) => ({ ...item }))
          // console.log(this.activityList);
          // this.taskList = this.activityList.filter((item: any) => item.actionflow === this.actionflow);
          await this.taskDetails()
          this.loadingBar.complete();

        } else {
          this.taskList = [];
        }
      }, err => {
        console.log(err);
        return this.taskList = [];
      });
  }


  async updateStatus(data, status){
    this.loadingBar.start();
    if (status === 'Stopped') status = 'Suspended'
    
    let projUpdt : any = {}
    Object.assign(projUpdt, ...data)
   
    // return;
    projUpdt.projecmangerid = projUpdt.projecmanger.id
    projUpdt.projecttypeId = projUpdt.projecttype.projecttypeId
    projUpdt.projectstatus	= status
   
    // return;
   await this.service.updateProject(projUpdt).subscribe(async res =>{
    if (res.message === 'Success') {
      this.loadingBar.complete();
      await this.reloadProject()
      this.snackBar.open('Update Successful', 'Dismiss', {
        panelClass: ['success'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }
   }, err => {
      this.loadingBar.complete();
    this.snackBar.open('Network Failed', 'Dismiss', {
     panelClass: ['error'],
     duration: 7000,
     verticalPosition: 'bottom',
     horizontalPosition: 'right'
   })
  })
  }

  async updateTaskStatus(data, status){
    this.loadingBar.start();
    // console.log(data)
    let task : any = {}
    Object.assign(task, ...data)
 
    task.status	= status
    task.usercomment = task.usercomment || ""

   await this.service.updateTask(task).subscribe(async res =>{
    if (res.message === 'Success') {
      this.loadingBar.complete();
      await this.fetchOwntaskList(this.currUser.id)
      await this.reloadProject()
      this.snackBar.open('Update Successful', 'Dismiss', {
        panelClass: ['success'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }
   }, err => {
      this.loadingBar.complete();
    this.snackBar.open('Network Failed', 'Dismiss', {
     panelClass: ['error'],
     duration: 7000,
     verticalPosition: 'bottom',
     horizontalPosition: 'right'
   })
  })
  }

  async reloadProject(){
    await this.service.getProjectList(this.queryParam)
      .subscribe(async response => {
        if (response.message === 'Success') {
          
          const datarray = await response.data.map(item => {
            return { ...item };
          });
          // console.log(datarray)
          if (this.isAdmin){
          this.projArray = datarray
          this.allprojs = datarray
           this.putDetails(datarray)
           this.loadingBar.complete();

            }else {
              const myprojects = []

             await datarray.forEach(async el => {
               if (el.teamMemberCounts >= 1){
                await this.service.getProjectTeamMembers(el.projectId).subscribe(async ({data}) => {
                 
                  await data.forEach(async e => {
                   if(e.id === this.currUser.id){
                    await myprojects.push(el)
                    this.projArray.push(el)
 
                   }
                   
                  })
                  // await this.putDetails(myprojects)
                });
                
                
                
               }
             }) 

            //  this.projArray = myprojects
             
             this.loadingBar.complete();
          }
          
          // this.putDetails(datarray)
          // this.dataSource = new MatTableDataSource(datarray);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
        }else {
          this.projArray = []
          this.loadingBar.complete();
          this.snackBar.open('Could not retrieve projects', 'Dismiss', {
          panelClass: ['error'],
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        })
        }
      }, err => {
        console.log(err);
        this.projArray = []
        this.loadingBar.complete();
        this.snackBar.open('Network Failed', 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
  }

  async updateRecord() {
    this.loadingBar.start();
   await this.service.getStatusList().subscribe(async res => {if(res.message === 'Success'){

      this.statusList = res.data
      res.data.forEach(el => {if(el.description != 'Completed') this.statsList.push(el)})
      // console.log(this.statusList)
    }});
    
    await this.reloadProject()
  }
  // onSearchClear() {
  //   this.searchKey = '';
  //   this.applyFilter();
  // }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }
  
  clearSearch(){
    this.projSearchKey="";
    this.projArray = this.allprojs
  }
  async applyProjFilter(){
     this.projArray = this.allprojs
     this.loadingBar.start();

      // console.log(this.projArray.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1))
      this.projArray = this.projArray.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1)
        
    this.loadingBar.complete();
   
  }

  async filterTask(userId){
     this.taskList = this.filtTaskList
     this.loadingBar.start();

     this.taskList = this.taskList.filter((task) => task.assignedto.id == userId)
      // console.log(this.projArray.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1))
      // this.projArray = this.projArray.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1)
        
    this.loadingBar.complete();
   
  }

}
