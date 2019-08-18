import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { DefaultlayoutService } from 'src/app/services/defaultlayout.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  scrollRight:boolean =false;
  scrollLeft:boolean = false;
  constructor( private service: ProjectService,
    private commonservice:DefaultlayoutService,
    ) {
    window.setInterval(() => {
      this.scrollRight && window.scrollBy(1,0);
      this.scrollLeft && window.scrollBy(-1, 0);
     })
  }

  allProjects =[];
  ngOnInit() {
    this.commonservice.handleBreadChrome({parent:'Project',child :'Activities'});
    // this.service.gettableData().subscribe(items=>{
    //   console.log(items);
    //  let projects =items.map(item=>{
    //    return{
    //      ...item
    //    }
    //  })
    //  this.allProjects = projects;

    // })
    this.allProjects = [
      {id: 1, name: 'E Time Table Generator', date: '21 Jan 2019', status: 'To do'},
    {id: 2, name: 'Airline Booking system', date: '12 May 2016', status: 'Completed'},
    {id: 3, name: 'E-learning portal', date: '01 Feb 2018', status: 'In Progress'},
    {id: 4, name: 'Tax Manager', date: '22 Jan 2016', status: 'Completed'},
    {id: 5, name: 'Payroll System', date: '22 April 2010', status: 'In Progress'},
    {id: 6, name: 'School Portal', date: '20 Jan 2012' , status: 'Completed'},
    {id: 7, name: 'Payment Gateway', date: '9 July 2019', status: 'To do'},
    {id: 8, name: 'Trade Manager', date: '11 Aug 2014', status: 'In Progress'},
    {id: 9, name: 'Portfolio site', date: '21 Dec 2013', status: 'Completed'},
    {id: 10, name: 'Web Game', date: '10 Oct 2019', status: 'To do'}]
  }

}
