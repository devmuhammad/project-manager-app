import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ActivityService } from 'src/app/services/activity.service';
import { UsersService } from 'src/app/services/users.service';
import { async } from '@angular/core/testing';
// import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  @ViewChild('scrollMe') elementView: ElementRef;
idx: -1;
public param = {
  size: 20,
  page: 1,
};
userProfile: any
public addChat = {
  activityType: ' ',
  assignedto: 0,
  description: '',
  parentid: 0,
  projectid: 0,
  projectstatus: 0,
  tasktypeid: 0,
  userid: 0
};
projSearchKey = ''
teamSearchKey = ''
allTeam = []
allprojs = []
chatType ='general'
chartArea: any;
shouldScroll: any;
chartIsloading: boolean;
comment: '';
  BASEACTIVITYTYPE: 'COMMENT';
activityList = [];
List = [];
  public queryParam = {
    datefrom: '',
    dateto: '',
    enddate: '',
    institutionId: '',
    sFilter: '',
    page: 0,
    size: 20,
  };
  prjctID = 0;
  self: number;
  projects: any = [];
userList: any;
myDOM: Object;
posted: boolean;
delete: boolean;
dltIndex: number;
isAdmin: boolean;
receiverid : number;

  constructor(private service: ProjectService,
              private loadingBar: LoadingBarService,
              private snackBar: MatSnackBar,
              private userService: UsersService,
              private activityServices: ActivityService,
              private commonservice: DefaultlayoutService,
              private dialog: MatDialog) {

              }

  ngOnInit() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    this.self = profile.id;
    const userType = localStorage.getItem('userType')
    if (userType === 'admin') { 
      this.isAdmin = true
    }

    this.getProjects();
    this.getAllUsers()
    this.showGeneral();
    this.idx = -1;

  }

  scrolltoBottom() {
    const l = this.elementView.nativeElement.offsetHeight;
    this.elementView.nativeElement.scrollTop = l;
  }

  ngAfterViewInit() {
    console.log('afterinit');
    setTimeout(() => {
    this.scrolltoBottom();
    }, 3000);
  }



fetchDeleteChat(index, id: number) {
  this.delete = true;  this.dltIndex = index;
  this.activityServices.deleteConversation(id)
  .subscribe(res => {
    if (res.message === 'Success') {
      // this.idx >= 1 ? this.fetchProjectComments(this.prjctID) : this.getGenChat() ;
          this.chatType === 'general' && this.showGeneral()
          this.chatType === 'private' && this.fetchUserConversation()
          this.chatType === 'project' && this.fetchProjectComments()
      this.delete = false;
      this.snackBar.open(' Chat deleted!', 'Dismiss', {
        panelClass: ['success'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    }
  }, err => {
    this.delete = false;
    this.snackBar.open(' Failed to delete chat', 'Dismiss', {
      panelClass: ['error'],
      duration: 7000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  });
  return this.scrolltoBottom();
}

    chatTime (dt){
      return new Date(dt).toDateString()
    }

  getAllUsers() {
    const profile = JSON.parse(localStorage.getItem('profile'));

    this.userService.userList(profile.id)
    .subscribe(res => {
      if (res.message === 'Success') {
        this.userList = res.data.map((item: any) => ({...item}));
        this.allTeam = res.data.map((item: any) => ({...item}));
        this.posted = false;
      }
    });
  }

  


  addGeneralChat (prf) {

    const newChat = {
      datecreated : new Date(),
      conversation : this.comment,
      user : prf.id
      
      }

    this.activityServices.AddGeneralConversation(newChat)
      .subscribe(res => {
        if (res.message === 'Success') {
          this.showGeneral()
         

          this.comment = '';
          this.chartIsloading = false;
          this.posted = false;
          // const chartArea = document.getElementById('cArea');
          // return chartArea.scrollTop = chartArea.scrollHeight;
        }
      }, err => {
        this.posted = false;
        this.snackBar.open('Failed to add chat' , 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
     
  }

  addUserChat (prf){
    const newChat = {
      datecreated : new Date(),
      description : this.comment,
      posterbyid : prf.id,
      receivedbyid : this.receiverid
      }


      this.activityServices.AddUserConversation(newChat)
      .subscribe(res => {
        if (res.message === 'Success') {
          this.fetchUserConversation()
         

          this.comment = '';
          this.chartIsloading = false;
          this.posted = false;
          // const chartArea = document.getElementById('cArea');
          // return chartArea.scrollTop = chartArea.scrollHeight;
        }
      }, err => {
        this.posted = false;
        this.snackBar.open('Failed to add chat' , 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
  }

  addProjectChat(prf){
    const newChat = {
      datecreated : new Date(),
      conversation : this.comment,
      user : prf.id,
      projectid : this.prjctID,
      }


      this.activityServices.AddProjectConversation(newChat)
      .subscribe(res => {
        if (res.message === 'Success') {
          this.fetchProjectComments()
         
          
          this.comment = '';
          this.chartIsloading = false;
          this.posted = false;
          // const chartArea = document.getElementById('cArea');
          // return chartArea.scrollTop = chartArea.scrollHeight;
        }
      }, err => {
        this.posted = false;
        this.snackBar.open('Failed to add chat' , 'Dismiss', {
          panelClass: ['error'],
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
  }

  adduserComment() {
    const l = document.getElementsByClassName('chatArea').length;

    // document.getElementsByClassName('chatArea')[l - 1].scrollIntoView();
    this.posted = true;
    const profile = JSON.parse(localStorage.getItem('profile'));
    // console.log(this.comment);
    if (this.comment === '') {
      this.posted = false;
      return ;
    }

      if(this.chatType === 'general'){
        this.addGeneralChat(profile)
      
      }else if (this.chatType === 'private'){
        this.addUserChat(profile)
      }else if (this.chatType === 'project'){
        this.addProjectChat(profile)
      }
    return this.scrolltoBottom();
  }

  showUserChat(user, index){
    this.chatType = 'private'
    this.activityList = []
    this.idx = index;
    this.receiverid = user.id
    this.fetchUserConversation()
  }

  showProjectChat(project, index) {
    // console.log(project);
    this.chatType = 'project'
    this.activityList = [];
    this.chartIsloading = true;
    this.idx = index;
    this.prjctID = project.projectId;
    this.fetchProjectComments();
  }

  showGeneral() {
    // this.activityList =[];
    this.chatType = 'general'
    this.idx = -1;
    this.getGenChat();
  }

fetchUserConversation (){
  this.activityList = [];
  const data = {
    postedby : this.self,
    receivedby : this.receiverid
  }
    this.activityServices.getUserConversations(data)
    .subscribe(res => {
      if (res.message === 'true') {

        const list = res.data 
        list.forEach(el => {
          if(el.posterbyid == this.self && el.receivedbyid == this.receiverid || el.posterbyid == this.receiverid && el.receivedbyid == this.self){
          let det = {
          username : el.posterbyid == this.self ? el.postedbyName : el.receivedbyName,
          datecreated: el.datecreated,
          conversation : el.description
          }
          
          this.activityList.push(det)
          }
          
          }) 
          

        
        this.chartIsloading = false;
        this.posted = false;
     
      }
    }, err => {
      this.chartIsloading = false;
      this.posted = false;
      this.activityList = [];
      console.log(err);
    });
    if (this.activityList.length > 0) {  this.scrolltoBottom(); }
}

async fetchProjectComments() {
  this.activityList = [];
  this.activityServices.getProjectConversations(this.prjctID)
  .subscribe(res => {
    if (res.message === 'true') {
      this.activityList = res.data
      this.chartIsloading = false;
      this.posted = false;
   
    }else {
      this.chartIsloading = false;
      this.posted = false;
    }
  }, err => {
    this.chartIsloading = false;
    this.posted = false;
    this.activityList = [];
    console.log(err);
  });
  if (this.activityList.length > 0) {  this.scrolltoBottom(); }
}

 async getGenChat  () {
  this.activityList = [];
   this.activityServices.getGeneralConversations()
    .subscribe(res => {
      if (res.message === 'true' ) {
        this.List = res.data.map((item: any) => ({...item}));
        this.activityList  = res.data.map((item: any) => ({...item}));
        
        // this.List.filter(item => item.projectid == null);
        // console.log(this.List);
        // this.getAllUsers();

      }
    }, err => {
      this.activityList = [];
      this.snackBar.open('Network Failed', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    });

  if (this.activityList.length > 0) this.scrolltoBottom(); 
  }
  
  getProjects() {
    this.service.getProjectList(this.queryParam)
    .subscribe(async response => {
      if (response.message === 'Success') {
        const datarray = response.data.map(item => {
          return { ...item };
        });

        if (this.isAdmin){
          this.projects = datarray
          this.allprojs = datarray

            }else {
              const myprojects = []

             await datarray.forEach(async el => {
               if (el.teamMemberCounts >= 1){
                await this.service.getProjectTeamMembers(el.projectId).subscribe(async ({data}) => {
                 
                  await data.forEach(async e => {
                   if(e.id === this.self){
                    await myprojects.push(el)
                    this.projects.push(el)
                    this.allprojs.push(el)
                   }
                   
                  })
                  // await this.putDetails(myprojects)
                });
                
                
                
               }
             }) 

            //  this.projArray = myprojects
             
             this.loadingBar.complete();
          }

        // console.log(this.projects);
      }
    }, err => {
      this.snackBar.open('Network Failed', 'Dismiss', {
        panelClass: ['error'],
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      });
    });
  }

  clearSearch(){
    this.projSearchKey="";
    this.projects = this.allprojs
  }
  async applyProjFilter(){
     this.projects = this.allprojs
     this.loadingBar.start();

      // console.log(this.projects.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1))
      this.projects = this.projects.filter((data) => JSON.stringify(data).replace(/("\w+":)/g, '').toLowerCase().indexOf(this.projSearchKey.toLowerCase()) !== -1)
        
    this.loadingBar.complete();
   
  }
  clearTmSearch(){
    this.teamSearchKey="";
    this.userList = this.allTeam
  }
  async applyTeamFilter(){
     this.userList = this.allTeam
     this.loadingBar.start();

      this.userList = this.userList.filter((data) => data.fullname.toLowerCase().indexOf(this.teamSearchKey.toLowerCase()) !== -1)
    // this.userList =  this.userList.filter((data)=> {return this.teamSearchKey.toLowerCase()  data.})     
    this.loadingBar.complete();
   
  }

}
