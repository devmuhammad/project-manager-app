import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

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

  constructor( private service: ProjectService,
    private commonservice:DefaultlayoutService,
    private loadingBar: LoadingBarService,
    private snackBar: MatSnackBar,
    ) {
    window.setInterval(() => {
      this.scrollRight && window.scrollBy(1,0);
      this.scrollLeft && window.scrollBy(-1, 0);
     })
  }
  getNextbar(e){
    
  }
  allProjects =[];
  ngOnInit() {
    this.commonservice.handleBreadChrome({parent:'Activities',child :'Project'});
    this.getProjects()
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
   getProjects(){
    this.loadingBar.start();
  this.service.getProjectList(this.queryParam)
      .subscribe(response => {
        if (response.message === 'Success') {
          this.loadingBar.complete();
          const datarray = response.data.map(item => {
            return { ...item };
          });
          // console.log(datarray)
          this.allProjects = datarray
       
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

  dateStarted(date){
    return new Date(date).toDateString()
  }

}
