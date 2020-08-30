import { Component, OnInit, ViewChild, InjectionToken } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MatSnackBar, MatSelectionListChange, MatOption, MatSelect, } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivityDetailComponent } from '../activity-detail/activity-detail.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {

  form: FormGroup;
  scrollRight:boolean =false;
  scrollLeft:boolean = false;
  public queryParam = {
    datefrom: '',
    dateto: '',
    enddate: '',
    institutionId:'',
    sFilter:'',
    page: 0,
    size: 20,
  };
  isAdmin = false
  currUser : any;
  selectedProj : null
  @ViewChild(ActivityDetailComponent ) activityDetail: ActivityDetailComponent ; 
  @ViewChild('projects') projSel: MatSelect;
  constructor( private service: ProjectService,
    private commonservice:DefaultlayoutService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private snackBar: MatSnackBar,
    ) {
      this.form = this.fb.group({
        selectdProj : [0]
      })
    window.setInterval(() => {
      this.scrollRight && window.scrollBy(1,0);
      this.scrollLeft && window.scrollBy(-1, 0);
     })
  }
  getNextbar(e){
    
  }
  allProjects =[];
  // projects = false
  ngOnInit() {
    this.commonservice.handleBreadChrome({parent:'Activities',child :'Project'});
    const profile = JSON.parse(localStorage.getItem('profile'))
    this.currUser = profile

    const userType = localStorage.getItem('userType')
    if (userType === 'admin') { 
      this.isAdmin = true
    }
    this.getProjects()

    // this.projSel.options.forEach((item: MatOption) => item.select());
    // this.allProjects = [
    //   {id: 1, name: 'E Time Table Generator', date: '21 Jan 2019', status: 'To do'},
    // {id: 2, name: 'Airline Booking system', date: '12 May 2016', status: 'Completed'},
    // {id: 3, name: 'E-learning portal', date: '01 Feb 2018', status: 'In Progress'},
    // {id: 4, name: 'Tax Manager', date: '22 Jan 2016', status: 'Completed'},
    // {id: 5, name: 'Payroll System', date: '22 April 2010', status: 'In Progress'},
    // {id: 6, name: 'School Portal', date: '20 Jan 2012' , status: 'Completed'},
    // {id: 7, name: 'Payment Gateway', date: '9 July 2019', status: 'To do'},
    // {id: 8, name: 'Trade Manager', date: '11 Aug 2014', status: 'In Progress'},
    // {id: 9, name: 'Portfolio site', date: '21 Dec 2013', status: 'Completed'},
    // {id: 10, name: 'Web Game', date: '10 Oct 2019', status: 'To do'}]
  }

  async handleSelectionChange(selProj) {
    // option: MatSelectionListChange, 
    // if (option.option.value) {
    //   this.selectedProj = option.option.value
    // }
    // console.log(selProj)
    // console.log(selProj.selectedOptions.selected[0].value)
  //  console.log(option.option)
    // console.log(selProj)
    const prjs = this.allProjects
    this.allProjects = []
       await prjs.forEach(async (el,i) => {
      if(el.projectId == selProj.projectId){
        el.selected = true
      }else el.selected = false
      
      this.allProjects.push(el)
    })
 
   this.activityDetail.filterActivityByProj(selProj)
  }
  
   getProjects(){
    this.loadingBar.start();
  this.service.getProjectList(this.queryParam)
      .subscribe(async response => {
        if (response.message === 'Success') {
          this.loadingBar.complete();
          const datarray = response.data.map( item => {
            return { ...item };
          });
          // console.log(datarray)
          if (this.isAdmin){
          await datarray.forEach(async e => { e.selected = true; this.allProjects.push(e)})

          }else{
            await datarray.forEach(async el => {
              if (el.teamMemberCounts >= 1){
               await this.service.getProjectTeamMembers(el.projectId).subscribe(async ({data}) => {
                
                 await data.forEach(async e => {
                  if(e.id === this.currUser.id){
                  //  await myprojects.push(el)
                    el.selected = true
                   this.allProjects.push(el)

                  }
                  
                 })
                 // await this.putDetails(myprojects)
               });
               
               
               
              }
            }) 
          }
          
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

  dateStarted(date){
    return new Date(date).toDateString()
  }

}
